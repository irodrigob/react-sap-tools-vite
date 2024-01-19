import { useCallback } from "react";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { ResponseMetadata } from "sap/general/infraestructure/types/general";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import useSAPGeneralStore from "./useSAPGeneralStore";
import UserInfo from "sap/general/domain/entities/userInfo";
import { useAppSelector } from "shared/storage/useStore";
import SAPFormatters from "sap/general/infraestructure/utils/formatters";
import useSystemStore from "systems/infraestructure/frontend/hooks/useSystemsStore";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { useTranslations } from "translations/i18nContext";
import AppsList from "sap/general/domain/entities/appsList";

export default function useSAPGeneral() {
	const sapController = new SAPController();
	const { showResultError, showMessage } = useMessages();
	const {
		setUserInfoAction,
		appsList,
		setAppsListAction,
		setURLODataCoreAction,
		URLODataCore,
	} = useSAPGeneralStore();
	//const { URL2ConnectSystem, systemSelected } = useSystemStore();
	const { URL2ConnectSystem, systemSelected } = useAppSelector(
		(state) => state.System
	);
	const { getI18nText, language } = useTranslations();

	const initialServicesSAPTools = useCallback(() => {
		// URL de conexion a los sistemas core
		setURLODataCoreAction(buildSAPUrl2Connect(URL2ConnectSystem));

		sapController
			.callMetadata(getDataForConnection())
			.then((responseMetadata: ResponseMetadata) => {
				if (responseMetadata.isSuccess) {
					readUserInfo();
					readAppsList();
				} else {
					showResultError(responseMetadata.getErrorValue() as ErrorGraphql);
				}
			});
	}, [appsList, URL2ConnectSystem]);
	const readUserInfo = useCallback(() => {
		sapController.readUserInfo().then((response) => {
			if (response.isSuccess) {
				setUserInfoAction(response.getValue() as UserInfo);
			}
		});
	}, []);
	/**
	 * Lectura de las aplicaciones
	 */
	const readAppsList = useCallback(() => {
		sapController
			.readAppsList(getDataForConnection(), language)
			.then((response) => {
				if (response.isSuccess) {
					let appListReaded = response.getValue() as AppsList[];
					// Al cambiar de sistema se guardan las app fijas(como el ADT) al modelo, por ello hay que
					// añadir las entradas obtenidos al modelo
					let appListTemp = appsList.concat(appListReaded);
					setAppsListAction(appListTemp);

					// Lanzamos los metadata para cada una de las APP
					appListReaded.forEach((row) => {
						sapController.callMetadata(getDataForConnection(row.app));
					});
				} else {
					showMessage(
						getI18nText("sapGeneral.errorLoadApps"),
						MessageType.error
					);
				}
			});
	}, [appsList, URL2ConnectSystem]);
	/**
	 * Devuelve los datos de conexión al sistema
	 * @returns Objetos con los datos de conexión al sistema
	 */
	const getDataForConnection = useCallback(
		(app?: string): DataConnectionSystem => {
			return {
				host: app ? getURLConnectionApp(app) : URLODataCore,
				sap_user: systemSelected.sap_user,
				sap_password: systemSelected.sap_password,
				client: systemSelected.client,
				language: systemSelected.language,
			};
		},
		[appsList, URL2ConnectSystem, URLODataCore]
	);

	/**
	 * Devuelve la URL de conexión en base a la aplicación pasada por parámetro
	 */
	const getURLConnectionApp = useCallback(
		(app: string) => {
			let service = appsList.find((row) => row.app == app)?.service ?? "";
			return buildSAPUrl2Connect(URL2ConnectSystem, service);
		},
		[appsList, URL2ConnectSystem]
	);
	/**
	 * Devuelve la URL completa para la conexión al sistema SAP
	 * @param host | Host del sistema
	 * @param service | Servicio
	 * @returns URL completa del servicio
	 */
	const buildSAPUrl2Connect = useCallback(
		(host: string, service?: string): string => {
			return SAPFormatters.buildSAPUrl2Connect(host, service);
		},
		[]
	);

	return { initialServicesSAPTools, getDataForConnection, getURLConnectionApp };
}
