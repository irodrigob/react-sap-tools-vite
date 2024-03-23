import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
	ResponseObjectStructure,
	ResponseObjectCheckRun,
} from "sap/adt/infraestructure/types/adt";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";
import { ADTObjectCheckRun } from "sap/adt/domain/entities/objectCheckRun";

export default class AdtBaseObject implements SAPAdtObjectContentInterface {
	protected adtRepository: SAPAdtRepository;

	constructor() {
		this.adtRepository = new SAPAdtRepository();
	}
	async getObjectContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion | undefined
	): Promise<ResponseAdtObjectContent> {
		return Result.fail<ErrorGeneral>(ErrorGeneral.create("Not implemented"));
	}
	async getObjectStructure(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ResponseObjectStructure> {
		try {
			let response = await this.adtRepository.getObjectStructure(
				dataConnection,
				objectUri
			);

			return Result.ok<ADTObjectStructure>(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
	/**
	 * Verifica que el objeto, se le pasa la URL, es sintacticamete correcto.
	 * @param dataConnection Datos de conexión
	 * @param objectUri URL del objeto
	 */
	async objectCheck(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ResponseObjectCheckRun> {
		try {
			let response = await this.adtRepository.objectCheck(
				dataConnection,
				objectUri
			);

			return Result.ok<ADTObjectCheckRun>(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
