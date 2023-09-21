import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { firstBy } from "thenby";
import System from "systems/domain/entities/system";
import {
	useSystemData,
	DEFAULT_SYSTEM,
} from "systems/infraestructure/context/systemContext";
import SystemController from "systems/infraestructure/controller/systemController";
import SAPController from "sap/general/infraestructure/controller/sapController";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import { useAppSelector } from "shared/storage/useStore";
import SystemActions from "systems/infraestructure/storage/systemActions";
import { useTranslations } from "translations/i18nContext";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { responseSystemRepoArray } from "systems/infraestructure/types/application";
import useTunnelSystem from "tunnelSystem/infraestructure/frontend/hooks/useTunnelSystem";

export default function useSystems() {
	const {
		systemsList,
		setSystemsList,
		tunnelConfiguration,
		setLoadingSystems,
		setShowSystemList,
		setLoadSystemList,
	} = useSystemData();
	const navigate = useNavigate();
	const { systemSelected } = useAppSelector((state) => state.System);
	const systemActions = new SystemActions();
	const systemController = new SystemController();
	const sapController = new SAPController();
	const sapTransportOrderController = new SAPTransportOrderController();
	const sapTranslateController = new SAPTranslateController();
	const { getI18nText } = useTranslations();
	const { showResultError, showMessage } = useMessages();
	const { getTunnelConfiguration, getTunnelProviders } = useTunnelSystem();

	/**
	 * Proceso que se lanza cuando se selecciona un sistema
	 * @param(System) systemSelected - Sistema seleccionado
	 */
	const processSelectedSystem = useCallback(
		(systemSelected: System) => {
			document.title = `${getI18nText("app.title")}: ${systemSelected.name}`;
			systemActions.setSystemSelected(systemSelected);

			// Indico que no se esta conectado al sistema.
			systemActions.setConnectedToSystem(false);

			// Oculto las tiles de selección de systema
			setShowSystemList(false);
			// Se indica que se mostrará la lista de aplicación
			sapController.setShowListApps(true);
			// Y el loader que se están leyendo las aplicaciones
			sapController.setLoadingListApps(true);

			// Se borras las variables principales de las aplicaciones para que no se visualice
			// datos de otro sistema si falla algo del sistema seleccionado.
			clearVariablesSystem();

			// En caso que no haya token de autentificación y se tenga marcado el tunel significa
			// que presuntamente se quiere un tunel anónimo. En ese caso la URL tiene que estar informado.
			if (
				tunnelConfiguration.authToken == "" &&
				systemSelected.url_manual_tunnel == "" &&
				systemSelected.use_connection_tunnel
			) {
				showMessage(
					getI18nText("systemSelect.anonymousTunnelWOURL"),
					MessageType.info
				);
			} else {
				systemController
					.determineURL2ConnectSystem(systemSelected, tunnelConfiguration)
					.then((response) => {
						if (response.isSuccess) {
							let URL2ConnectSystem = response.getValue() as string;
							// Guardamos la URL base de conexión
							systemActions.setURL2ConnectSystem(URL2ConnectSystem);

							// Guardamos la URL para conectarse a los servicio core del sistema
							sapController.setURLODataCore(
								sapController.buildSAPUrl2Connect(URL2ConnectSystem)
							);

							sapController
								.executeServicesSystemSelect()
								.then((responseSAP) => {
									sapController.setLoadingListApps(false);
									if (responseSAP.isSuccess) {
										// Si el proceso de lectura de aplicaciones, metadata, etc. Se ejecutan con éxito
										// Se lanza los procesos cuando se cambia de sistema.
										changeSystemGeneralActions();
									} else {
										showResultError(
											responseSAP.getErrorValue() as ErrorGraphql
										);
									}
								});
						} else if (response.isFailure) {
							sapController.setLoadingListApps(false);
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
					});
			}
		},
		[tunnelConfiguration]
	);

	/**
	 * Acciones generales cuando se cambia un sistema
	 */
	const changeSystemGeneralActions = useCallback(() => {
		// Si indica que el sistema se ha cambiado y la aplicación de SAP tiene que volver a releer los datos
		sapController.setSystemChanged(true);
	}, []);

	/**
	 * Devuelve si el sistema pasado esta seleccionado
	 * @param sIDSystem - ID del sistema
	 * @returns Booleano
	 */
	const isSystemSelected = useCallback(
		(sIDSystem: string): boolean => {
			if (
				systemSelected &&
				systemSelected._id &&
				systemSelected._id == sIDSystem
			)
				return true;
			else return false;
		},
		[systemSelected]
	);

	/**
	 * Función que añade un sistema al modelo de datos
	 * @param sSystem | Estructura con los datos del sistema
	 */
	const addSystem = useCallback(
		(sSystem: System) => {
			let aSystemsAux = [...systemsList];
			aSystemsAux.push(sSystem);
			// Ordeno el array para que quede igual de ordenado como cuando se graban los datos
			// por primera vez
			aSystemsAux = aSystemsAux.sort(firstBy("name"));
			setSystemsList(aSystemsAux);
		},
		[systemsList]
	);

	/**
	 * Función que actualiza un sistema al modelo de datos
	 * @param sSystem | Estructura con los datos del sistema
	 */
	const updateSystem = useCallback(
		(system: System) => {
			let aSystemsAux = [...systemsList];
			let index = aSystemsAux.findIndex((row) => row._id == system._id);
			aSystemsAux[index] = system;
			// Ordeno el array para que quede igual de ordenado como cuando se graban los datos
			// por primera vez
			aSystemsAux = aSystemsAux.sort(firstBy("name"));
			setSystemsList(aSystemsAux);

			// Ahora miro si el sistema seleccionado es el mismo que el modificado. Si es así, le cambio el nombre
			if (system._id == systemSelected._id)
				systemActions.setSystemSelected(system);
		},
		[systemsList, systemSelected]
	);

	/**
	 * Función que borra un sistema al modelo de datos
	 * @param pID | Id del registro a borrar
	 */
	const deleteSystem = useCallback(
		(pID: string) => {
			let aSystemsAux = [...systemsList];

			let index = aSystemsAux.findIndex((row) => row._id == pID);
			aSystemsAux.splice(index, index >= 0 ? 1 : 0);

			setSystemsList(aSystemsAux);

			// El sistema marcado por defecto lo dejo en blanco.
			systemActions.setSystemSelected(DEFAULT_SYSTEM);

			// Acciones generales cuando se cambia o borra un sistema
			deleteSystemGeneralActions();
		},
		[systemsList]
	);

	/**
	 * Acciones generales cuando se borra un sistema
	 */
	const deleteSystemGeneralActions = useCallback(() => {
		clearVariablesSystem();

		// Vamos a la página de inicio
		navigate("/");
	}, []);

	/**
	 * Lectura de los sistema del usuario
	 */
	const readSystemsUser = useCallback((email: string) => {
		// Lectura de los sistemas
		systemController
			.getUserSystems(email)
			.then((response: responseSystemRepoArray) => {
				setLoadingSystems(false);
				setLoadSystemList(false);
				if (response.isSuccess) {
					setSystemsList(response.getValue() as System[]);
				} else if (response.isFailure) {
					showMessage(
						getI18nText("systemSelect.errorCallServiceRead", {
							errorService: (
								response.getErrorValue() as ErrorGraphql
							).getError().singleMessage,
						}),
						MessageType.error
					);
				}
			});

		// Lectura de los datos para el tunneling para conectarse a los sistemas.
		getTunnelConfiguration(email);
		getTunnelProviders();
	}, []);

	/**
	 * Borrado de variables generales de las aplicación. Esto servirá en borrado de sistema o cambio de sistema
	 */
	const clearVariablesSystem = useCallback(() => {
		sapController.clearVariables();
		sapTransportOrderController.clearVariables();
		sapTranslateController.clearVariables();
	}, []);

	return {
		processSelectedSystem,
		isSystemSelected,
		addSystem,
		updateSystem,
		deleteSystem,
		readSystemsUser,
	};
}
