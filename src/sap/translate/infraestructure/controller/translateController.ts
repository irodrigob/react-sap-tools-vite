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
} from "sap/translate/infraestructure/types/application";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import { APP } from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default class TranslateController {
	private appStore: AppStore;
	private translateApplication: TranslateApplication;
	private sapController: SAPController;

	constructor() {
		this.appStore = new AppStore();
		this.translateApplication = new TranslateApplication();
		this.sapController = new SAPController();
	}
	/**
	 * Obtiene los idiomas a traducir
	 * @returns | Resultado con los idiomas
	 */
	async getLanguages(): Promise<ResponseLanguages> {
		return this.translateApplication.getLanguages(this.getDataForConnection());
	}
	/**
	 * Obtiene los objetos que se pueden traducir
	 * @returns | Resultado con los objetos seleccionables
	 */
	async getSelectableObjects(): Promise<ResponseSelectableObjects> {
		return this.translateApplication.getSelectableObjects(
			this.getDataForConnection()
		);
	}
	/**
	 * Obtiene los textos a traducir del objeto pasado por parámetro
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @returns | Resultado con las traducciones
	 */
	async getObjectTranslate(
		paramsTranslate: ParamsObjectTranslate
	): Promise<ReponseGetObjectsTranslate> {
		return this.translateApplication.getObjectTranslate(
			this.getDataForConnection(),
			paramsTranslate
		);
	}
	/**
	 * Graba los textos traducidos
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param ObjectsText | Textos a traducir
	 * @returns | Resultado con las traducciones confirmadas y resultado del proceso
	 */
	async saveObjectTranslate(
		paramsTranslate: ParamsObjectTranslate,
		objectsText: ObjectsText
	): Promise<ReponseSaveTranslate> {
		return this.translateApplication.saveObjectTranslate(
			this.getDataForConnection(),
			paramsTranslate,
			objectsText
		);
	}
	/**
	 * Verifica que el objeto exista
	 * @param object | Tipo de objeto
	 * @param objectName | Nombre de objeto
	 */
	async checkObject(
		object: string,
		objectName: string
	): Promise<ResponseCheckObject> {
		return await this.translateApplication.checkObject(
			this.getDataForConnection(),
			object,
			objectName
		);
	}
	/**
	 * Verifica que la orden exista
	 * @param order | Orden
	 */
	async checkOrder(order: string): Promise<ResponseCheckOrder> {
		return await this.translateApplication.checkOrder(
			this.getDataForConnection(),
			order
		);
	}
	/**
	 * Devuelve los datos de conexión al sistema
	 * @returns Objetos con los datos de conexión al sistema
	 */
	getDataForConnection(): DataConnectionSystem {
		return {
			...this.sapController.getDataForConnection(APP),
		};
	}
}
