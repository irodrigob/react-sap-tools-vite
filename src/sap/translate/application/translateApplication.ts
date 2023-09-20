import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import TranslateRepository from "sap/translate/infraestructure/repositories/translateRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ResponseLanguages,
	ReponseSaveTranslate,
	ResponseSelectableObjects,
	ReponseGetObjectsTranslate,
	ResponseCheckObject,
	ResponseCheckOrder,
	ResponseAddObject2Order,
} from "sap/translate/infraestructure/types/application";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import ObjectText from "sap/translate/domain/entities/objectText";
import { ReturnsDTO } from "shared/dto/generalDTO";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";

export default class TranslateApplication {
	private translateRepository: TranslateRepository;

	constructor() {
		this.translateRepository = new TranslateRepository();
	}
	/**
	 * Obtiene los idiomas a traducir
	 * @param dataConnection | Datos conexión sistema
	 * @returns | Resultado con los idiomas
	 */
	async getLanguages(
		dataConnection: DataConnectionSystem
	): Promise<ResponseLanguages> {
		try {
			let response = await this.translateRepository.getLanguages(
				dataConnection
			);

			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Obtiene los objetos que se pueden traducir
	 * @param dataConnection | Datos conexión sistema
	 * @returns | Resultado con los objetos seleccionables
	 */
	async getSelectableObjects(
		dataConnection: DataConnectionSystem
	): Promise<ResponseSelectableObjects> {
		try {
			let response = await this.translateRepository.getSelectableObjects(
				dataConnection
			);

			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Obtiene los textos a traducir del objeto pasado por parámetro
	 * @param dataConnection | Datos conexión sistema
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @returns | Resultado con las traducciones
	 */
	async getObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate
	): Promise<ReponseGetObjectsTranslate> {
		try {
			let response = await this.translateRepository.getObjectTranslate(
				dataConnection,
				paramsTranslate
			);

			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Graba los textos traducidos
	 * @param dataConnection | Datos conexión sistema
	 * @param paramsTranslate | Parametros del objeto a traducción
	 * @param ObjectsText | Textos a traducir
	 * @returns | Resultado con las traducciones confirmadas y resultado del proceso
	 */
	async saveObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objectsText: ObjectsText
	): Promise<ReponseSaveTranslate> {
		try {
			let objectsTextDTO = objectsText.map((objectText: ObjectText) => {
				return {
					object: objectText.object,
					objName: objectText.objName,
					objType: objectText.objType,
					idText: objectText.idText,
					langTlang1: objectText.langTlang1,
					txtTlang1: objectText.txtTlang1,
					langTlang2: objectText.langTlang2,
					txtTlang2: objectText.txtTlang2,
					langTlang3: objectText.langTlang3,
					txtTlang3: objectText.txtTlang3,
					langTlang4: objectText.langTlang4,
					txtTlang4: objectText.txtTlang4,
					langTlang5: objectText.langTlang5,
					txtTlang5: objectText.txtTlang5,
					langTlang6: objectText.langTlang6,
					txtTlang6: objectText.txtTlang6,
					langTlang7: objectText.langTlang7,
					txtTlang7: objectText.txtTlang7,
					langTlang8: objectText.langTlang8,
					txtTlang8: objectText.txtTlang8,
					langTlang9: objectText.langTlang9,
					txtTlang9: objectText.txtTlang9,
					langTlang10: objectText.langTlang10,
					txtTlang10: objectText.txtTlang10,
				};
			});

			let response = await this.translateRepository.saveObjectTranslate(
				dataConnection,
				paramsTranslate,
				objectsTextDTO
			);

			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Verifica que el objeto exista
	 * @param dataConnection | Datos de conexión
	 * @param object | Tipo de objeto
	 * @param objectName | Nombre de objeto
	 */
	async checkObject(
		dataConnection: DataConnectionSystem,
		object: string,
		objectName: string
	): Promise<ResponseCheckObject> {
		try {
			await this.translateRepository.checkObject(
				dataConnection,
				object,
				objectName
			);

			return Result.ok(undefined);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Verifica que la orden exista
	 * @param dataConnection | Datos de conexión
	 * @param order | Orden
	 */
	async checkOrder(
		dataConnection: DataConnectionSystem,
		order: string
	): Promise<ResponseCheckOrder> {
		try {
			await this.translateRepository.checkOrder(dataConnection, order);

			return Result.ok(undefined);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	async addObjects2Order(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objects: AddObjects2Order
	): Promise<ResponseAddObject2Order> {
		try {
			let response = await this.translateRepository.addObjects2Order(
				dataConnection,
				paramsTranslate,
				objects
			);
			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
