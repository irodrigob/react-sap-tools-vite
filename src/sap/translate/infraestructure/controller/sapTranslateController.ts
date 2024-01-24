import TranslateApplication from "sap/translate/application/translateApplication";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SAPController from "sap/general/infraestructure/controller/sapController";
import AppStore from "shared/storage/appStore";
import {
	ResponseLanguages,
	ReponseSaveTranslate,
	ResponseSelectableObjects,
	ReponseGetObjectsTranslate,
	ResponseCheckObject,
	ResponseCheckOrder,
	ResponseAddObject2Order,
} from "sap/translate/infraestructure/types/application";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import { APP } from "sap/translate/infraestructure/utils/constants/constantsTranslate";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import { INIT_PARAMS_OBJECT_TRANSLATE } from "sap/translate/infraestructure/utils/initValues";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";

export default class SAPTranslateController {
	private appStore: AppStore;
	private translateApplication: TranslateApplication;
	private sapController: SAPController;
	private sapTranslateActions: SAPTranslateActions;

	constructor() {
		this.appStore = new AppStore();
		this.translateApplication = new TranslateApplication();
		this.sapController = new SAPController();
		this.sapTranslateActions = new SAPTranslateActions();
	}
	/**
	 * Obtiene los idiomas a traducir
	 * @param dataConnection | Datos conexion
	 * @returns | Resultado con los idiomas
	 */
	async getLanguages(
		dataConnection: DataConnectionSystem
	): Promise<ResponseLanguages> {
		return this.translateApplication.getLanguages(dataConnection);
	}
	/**
	 * Obtiene los objetos que se pueden traducir
	 * @param dataConnection | Datos conexion
	 * @returns | Resultado con los objetos seleccionables
	 */
	async getSelectableObjects(
		dataConnection: DataConnectionSystem
	): Promise<ResponseSelectableObjects> {
		return this.translateApplication.getSelectableObjects(dataConnection);
	}
	/**
	 * Obtiene los textos a traducir del objeto pasado por parámetro
	 * @param dataConnection | Datos conexion
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @returns | Resultado con las traducciones
	 */
	async getObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate
	): Promise<ReponseGetObjectsTranslate> {
		return this.translateApplication.getObjectTranslate(
			dataConnection,
			paramsTranslate
		);
	}
	/**
	 * Graba los textos traducidos
	 * @param dataConnection | Datos conexion
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param ObjectsText | Textos a traducir
	 * @returns | Resultado con las traducciones confirmadas y resultado del proceso
	 */
	async saveObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objectsText: ObjectsText
	): Promise<ReponseSaveTranslate> {
		return this.translateApplication.saveObjectTranslate(
			dataConnection,
			paramsTranslate,
			objectsText
		);
	}
	/**
	 * Verifica que el objeto exista
	 * @param dataConnection | Datos conexion
	 * @param object | Tipo de objeto
	 * @param objectName | Nombre de objeto
	 */
	async checkObject(
		dataConnection: DataConnectionSystem,
		object: string,
		objectName: string
	): Promise<ResponseCheckObject> {
		return await this.translateApplication.checkObject(
			dataConnection,
			object,
			objectName
		);
	}
	/**
	 * Verifica que la orden exista
	 * @param dataConnection | Datos conexion
	 * @param order | Orden
	 */
	async checkOrder(
		dataConnection: DataConnectionSystem,
		order: string
	): Promise<ResponseCheckOrder> {
		return await this.translateApplication.checkOrder(dataConnection, order);
	}
	/**
	 * Borrado de variables principales de la aplicación.
	 * Se usará en cambios de sistema, borrado de aplicación, etc..
	 */
	clearVariables(): void {
		this.sapTranslateActions.setObjectsText([]);
		this.sapTranslateActions.setObjectsTextOriginal([]);
		this.sapTranslateActions.setParamsObjectsTranslate(
			INIT_PARAMS_OBJECT_TRANSLATE
		);
	}
	/**
	 * Graba los textos traducidos
	 * @param dataConnection | Datos conexion
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param ObjectsText | Textos a traducir
	 * @returns | Resultado con las traducciones confirmadas y resultado del proceso
	 */
	async addObjects2Order(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objects: AddObjects2Order
	): Promise<ResponseAddObject2Order> {
		return this.translateApplication.addObjects2Order(
			dataConnection,
			paramsTranslate,
			objects
		);
	}
}
