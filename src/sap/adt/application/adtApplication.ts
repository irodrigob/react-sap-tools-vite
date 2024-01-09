import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import AppStore from "shared/storage/appStore";
import { ResponseSearchObject } from "sap/adt/infraestructure/types/adt";
import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class AdtApplication {
	private appStore: AppStore;
	private adtRepository: SAPAdtRepository;

	constructor() {
		this.appStore = new AppStore();
		this.adtRepository = new SAPAdtRepository();
	}
	/**
	 * Búsqueda de objeto por un tipo/subtipo de objetos
	 * @param dataConnection Datos conexión
	 * @param objectType Tipo de objeto
	 * @param legacyType Subtipo de objeto
	 * @param searchQuery objeto a buscar
	 * @returns Resultado de la búsqueda
	 */
	async searchObjectSingleType(
		dataConnection: DataConnectionSystem,
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		try {
			let response = await this.adtRepository.searchObjectSingleType(
				dataConnection,
				objectType,
				legacyType,
				searchQuery
			);
			return Result.ok(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
