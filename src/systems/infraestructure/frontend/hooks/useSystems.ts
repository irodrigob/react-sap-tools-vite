import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { firstBy } from "thenby";
import System from "systems/domain/entities/system";
import {
	useSystemData,
	DEFAULT_SYSTEM,
} from "systems/infraestructure/context/systemContext";
import SystemController from "systems/infraestructure/controller/systemController";
import { useAppSelector } from "shared/storage/useStore";
import { useTranslations } from "translations/i18nContext";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { responseSystemRepoArray } from "systems/infraestructure/types/application";
import useTunnelSystem from "tunnelSystem/infraestructure/frontend/hooks/useTunnelSystem";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";
import useSystemStore from "./useSystemsStore";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";
import useMessageManagerStore from "messageManager/infraestructure/frontend/hooks/useMessageManagerStore";

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
	const {
		setShowListAppsAction,
		setLoadingListAppsAction,
		clearVariablesAction: sapGeneralClearVariablesAction,
		addAdtApp2StoreAction,
		setSystemChangedAction,
	} = useSAPGeneralStore();
	const systemController = new SystemController();
	const {
		setSystemSelectedAction,
		setConnectedToSystemAction,
		setURL2ConnectSystemAction,
	} = useSystemStore();
	const { getI18nText } = useTranslations();
	const { showResultError, showMessage } = useMessages();
	const { getTunnelConfiguration, getTunnelProviders } = useTunnelSystem();
	const { clearVariables: sapTransportOrderClearVariables } =
		useSAPTransportOrderStore();
	const { clearVariables: sapTransalateClearVariables } =
		useSAPTranslateStore();
	const { clearVariables: messageManagerClearVariables } =
		useMessageManagerStore();

	/**
	 * Proceso que se lanza cuando se selecciona un sistema
	 * @param(System) systemSelected - Sistema seleccionado
	 */
	const processSelectedSystem = useCallback(
		async (systemSelected: System) => {
			document.title = `${getI18nText("app.title")}: ${systemSelected.name}`;

			setSystemSelectedAction(systemSelected);

			setSystemChangedAction(true); // Se indica que el sistema ha cambiado

			// Indico que no se esta conectado al sistema.
			setConnectedToSystemAction(false);

			// Oculto las tiles de selección de systema
			setShowSystemList(false);

			// Se indica que se mostrará la lista de aplicación
			setShowListAppsAction(true);

			// Y el loader que se están leyendo las aplicaciones
			setLoadingListAppsAction(true);

			// Se borras las variables principales de las aplicaciones para que no se visualice
			// datos de otro sistema si falla algo del sistema seleccionado.
			clearVariablesSystem();

			// En caso que no haya token de autentificación y se tenga marcado el tunel significa
			// que presuntamente se quiere un tunel anónimo. En ese caso la URL tiene que estar informada.
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
							setURL2ConnectSystemAction(URL2ConnectSystem);
							// Se añade la app de ADT
							addAdtApp2StoreAction();
						} else {
							setLoadingListAppsAction(false);
							showResultError(response.getErrorValue() as ErrorGraphql);
						}
					});
			}
		},
		[tunnelConfiguration]
	);

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
			if (system._id == systemSelected._id) setSystemSelectedAction(system);
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
			setSystemSelectedAction(DEFAULT_SYSTEM);

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
		sapGeneralClearVariablesAction();
		sapTransportOrderClearVariables();
		sapTransalateClearVariables();
		messageManagerClearVariables();
	}, []);

	return {
		processSelectedSystem,
		isSystemSelected,
		addSystem,
		updateSystem,
		deleteSystem,
		readSystemsUser,
		clearVariablesSystem,
	};
}
