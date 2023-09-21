import i18n from "i18next";
import { Result } from "shared/core/Result";
import {
	responseMetadata,
	responseGetUserInfoRepo,
	responseGetAppsList,
} from "sap/general/infraestructure/types/general";
import SAPGeneralApplication from "sap/general/application/SAPGeneralApplication";
import AppsList from "sap/general/domain/entities/appsList";
import AppStore from "shared/storage/appStore";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SystemController from "systems/infraestructure/controller/systemController";

export default class SAPController {
	private appStore: AppStore;
	private SAPGeneralApplication: SAPGeneralApplication;
	private SAPGeneralActions: SAPGeneralActions;
	private systemController: SystemController;

	constructor() {
		this.SAPGeneralApplication = new SAPGeneralApplication();
		this.appStore = new AppStore();
		this.SAPGeneralActions = new SAPGeneralActions();
		this.systemController = new SystemController();
	}

	/**
	 * Devuelve la URL completa para la conexión al sistema SAP
	 * @param host | Host del sistema
	 * @param service | Servicio
	 * @returns URL completa del servicio
	 */
	buildSAPUrl2Connect(host: string, service?: string): string {
		return this.SAPGeneralApplication.buildSAPUrl2Connect(host, service);
	}
	/**
	 * Guarda en el modelo la URL base para conectarse a servicio Odat
	 * @param url | Url
	 */
	setURLODataCore(url: string): void {
		this.SAPGeneralActions.setURLODataCore(url);
	}
	/**
	 * Ejecuta los servicios al seleccionar un sistema
	 */
	async executeServicesSystemSelect(): Promise<responseMetadata> {
		// Primero se lee el metadata del core. Si este va bien se continuan con el resto de servicio
		let result = await this.SAPGeneralApplication.callMetaData(
			this.getDataForConnection()
		);
		if (result.isSuccess) {
			this.systemController.setConnectedToSystem(true);

			// Se llama al servicio de obtención de usuarios
			this.readUserInfo();

			// Listado de aplicaciones, me espero porque aparte de leer las aplicaciones lanza el metadata
			// de cada una de ellas. Y el metadata se tiene que lanzar antes que los servicios de cada aplicación.
			await this.readAppsList();

			return Result.ok<void>();
		} else {
			return result;
		}
	}
	/**
	 * Devuelve los datos del usuario de conexión
	 * @returns | Promesa con el resultado del proceso
	 */
	async readUserInfo(): Promise<responseGetUserInfoRepo> {
		return this.SAPGeneralApplication.readUserInfo(this.getDataForConnection());
	}
	/**
	 * Obtiene la lista de aplicaciones configuradas
	 * @returns | Promesa con el resultado del proceso
	 */
	async readAppsList(
		language: string = i18n.language
	): Promise<responseGetAppsList> {
		return this.SAPGeneralApplication.readAppsList(this.getDataForConnection());
	}
	/**
	 * Devuelve la lista de aplicaciones del modelo
	 * @returns Array con la lista de aplicaciones
	 */
	getAppList(): AppsList[] {
		return this.appStore.getState().SAPGeneral.appsList;
	}
	/**
	 * Indicador si se tiene que mostrar el listado de aplicaciones
	 * @param value | Booleano con la acción
	 */
	setShowListApps(value: boolean) {
		this.SAPGeneralActions.setShowListApps(value);
	}
	/**
	 * Indicador si se muestra el loader de leyendo aplicaciones
	 * @param value
	 */
	setLoadingListApps(value: boolean) {
		this.SAPGeneralActions.setLoadingListApps(value);
	}
	/**
	 * Indicador para saber si los servicios principales:metadata, userinfo,apps
	 * han sido cargados. Paso básico para poder llamar al resto de servicios
	 * @param value
	 */
	setMainServicesLoaded(value: boolean) {
		this.SAPGeneralActions.setMainServicesLoaded(value);
	}
	/**
	 * Devuelve los datos de conexión al sistema
	 * @returns Objetos con los datos de conexión al sistema
	 */
	getDataForConnection(app?: string): DataConnectionSystem {
		return {
			host: app
				? this.SAPGeneralApplication.getURLConnectionApp(app)
				: this.appStore.getState().SAPGeneral.URLODataCore,
			sap_user: this.appStore.getState().System.systemSelected.sap_user,
			sap_password: this.appStore.getState().System.systemSelected.sap_password,
			client: this.appStore.getState().System.systemSelected.client,
			language: this.appStore.getState().System.systemSelected.language,
		};
	}
	/**
	 * Actualiza si el sistema ha cambiado.
	 * @param change Valor si ha cambiado el sistema o no.
	 */
	setSystemChanged(change: boolean = true) {
		this.SAPGeneralActions.setSystemChanged(change);
	}
	/**
	 * Actualiza si se cambia de aplicación
	 * @param change Valor si ha cambiado la aplicación
	 */
	setApplicationChanged(change: boolean = true) {
		this.SAPGeneralActions.setApplicationChanged(change);
	}
	/**
	 * Limpieza de variables principales de SAP. Se usará en cambios de sistemas
	 * u otras operación que requiera resetear los valores.
	 */
	clearVariables(): void {
		this.SAPGeneralActions.setAppsList([]);
		this.SAPGeneralActions.setApplicationChanged(false);
	}
}
