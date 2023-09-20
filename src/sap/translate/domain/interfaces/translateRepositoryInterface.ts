import {
	Languages,
	ObjectsText,
	SelectableObjects,
	ParamsObjectTranslate,
	ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate";
import { ObjectsTextToSaveDTO } from "sap/translate/infraestructure/dto/setObjectTextDTO";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { ReturnsDTO } from "shared/dto/generalDTO";

export default interface TranslateRepositoryInterface {
	/**
	 * Obtiene los idiomas a traducir
	 * @param dataConnection | Datos conexión sistema
	 * @returns | Array con los idiomas
	 */
	getLanguages(dataConnection: DataConnectionSystem): Promise<Languages>;
	/**
	 * Obtiene los objetos que se pueden traducir
	 * @param dataConnection | Datos conexión sistema
	 * @returns | Array con los objetos
	 */
	getSelectableObjects(
		dataConnection: DataConnectionSystem
	): Promise<SelectableObjects>;
	/**
	 * Obtiene los textos a traducir del objeto pasado por parámetro
	 * @param dataConnection | Datos conexión sistema
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @returns | Array con las traducciones
	 */
	getObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate
	): Promise<ObjectsText>;
	/**
	 * Graba los textos traducidos
	 * @param dataConnection | Datos conexión sistema
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param objectsText | Textos a traducir
	 * @returns | Array con las traducciones confirmadas en SAP y los mensajes del proceso
	 */
	saveObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objectsText: ObjectsTextToSaveDTO
	): Promise<ResponseSaveObjectText>;
	/**
	 * Verifica que el objeto exista
	 * @param dataConnection | Datos de conexión
	 * @param object | Tipo de objeto
	 * @param objectName | Nombre de objeto
	 */
	checkObject(
		dataConnection: DataConnectionSystem,
		object: string,
		objectName: string
	): Promise<void>;
	/**
	 * Verifica que la orden exista
	 * @param dataConnection | Datos de conexión
	 * @param order | Orden
	 */
	checkOrder(
		dataConnection: DataConnectionSystem,
		order: string
	): Promise<void>;
	/**
	 * Guarda los objetos en una orden de transporte
	 * @param dataConnection | Datos conexión sistema
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param objects | Objetos a guardar en una orden
	 * @returns |
	 */
	addObjects2Order(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objects: AddObjects2Order
	): Promise<ReturnsDTO>;
}
