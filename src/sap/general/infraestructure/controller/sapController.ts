import i18n from "i18next";
import {
	ResponseMetadata,
	ResponseGetUserInfoRepo,
	ResponseGetAppsList,
} from "sap/general/infraestructure/types/general";
import SAPGeneralApplication from "sap/general/application/SAPGeneralApplication";
import AppsList from "sap/general/domain/entities/appsList";
import AppStore from "shared/storage/appStore";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import { SAP_TOOLS_OBJECT_NAMES } from "sap/general/infraestructure/utils/constants/constants";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import ErrorGraphql from "shared/errors/ErrorGraphql";

export default class SAPController {
	private appStore: AppStore;
	private SAPGeneralApplication: SAPGeneralApplication;
	private sapAdtController: SAPAdtController;

	constructor() {
		this.SAPGeneralApplication = new SAPGeneralApplication();
		this.appStore = new AppStore();
		this.sapAdtController = new SAPAdtController();
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
	 * Llama a los servicios de metadata
	 */
	async callMetadata(
		dataConnection: DataConnectionSystem
	): Promise<ResponseMetadata> {
		return await this.SAPGeneralApplication.callMetaData(dataConnection);
	}
	/**
	 * Devuelve los datos del usuario de conexión
	 * @returns | Promesa con el resultado del proceso
	 */
	async readUserInfo(
		dataConnection: DataConnectionSystem
	): Promise<ResponseGetUserInfoRepo> {
		return this.SAPGeneralApplication.readUserInfo(dataConnection);
	}
	/**
	 * Obtiene la lista de aplicaciones configuradas
	 * @returns | Promesa con el resultado del proceso
	 */
	async readAppsList(
		dataConnection: DataConnectionSystem,
		language: string = i18n.language
	): Promise<ResponseGetAppsList> {
		return this.SAPGeneralApplication.readAppsList(dataConnection);
	}
	/**
	 * Devuelve la lista de aplicaciones del modelo
	 * @returns Array con la lista de aplicaciones
	 */
	getAppList(): AppsList[] {
		return this.appStore.getState().SAPGeneral.appsList;
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
	 * Verifica si la herramienta SAP Tools esta instalada
	 * @returns Booleano si esta instalado o no
	 */
	async checkSAPToolsInstalled(
		dataConnection: DataConnectionSystem
	): Promise<boolean | ErrorGraphql> {
		// Se usa el ADT para verificar si existe la clase Z que gestiona las peticiones OData
		let response = await this.sapAdtController.quickSearch(
			dataConnection,
			ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE,
			SAP_TOOLS_OBJECT_NAMES.SAP_TOOLS_GW_CUSTOM_CLASS
		);
		if (response.isSuccess) {
			let values = response.getValue() as ADTSearchObjects;
			if (Array.isArray(values) && values.length > 0) return true;
			else return false;
		} else {
			return response.getErrorValue() as ErrorGraphql;
		}
	}
	/**
	 * Devuelve al app para el acceso al ADT
	 */
	ADTAppList() {
		return this.SAPGeneralApplication.ADTAppList();
	}
}
