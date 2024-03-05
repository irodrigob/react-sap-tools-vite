import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTObjectContent,
	ADTObjectVersion,
	ResponseAdtObjectContent,
	ResponseObjectStructure,
} from "sap/adt/infraestructure/types/adt";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";

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
	async getObjectReadStructure(
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
}
