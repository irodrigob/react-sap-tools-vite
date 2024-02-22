import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import AdtBaseObject from "./adtBaseObject";
import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
} from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { ADTClassContent } from "sap/adt/domain/entities/classContent";
import EditorClassContainer from "sap/adt/infraestructure/frontend/components/editorArea/editor/class/editorClassContainer";
import { FC, ReactNode } from "react";

export default class ADTClassObject
	extends AdtBaseObject
	implements SAPAdtObjectContentInterface
{
	/**
	 * Devuelve el contenido de una clase
	 */
	async getObjectContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion | undefined
	): Promise<ResponseAdtObjectContent> {
		try {
			let response = await this.adtRepository.getClassContent(
				dataConnection,
				objectUri,
				Objectversion
			);

			return Result.ok<ADTClassContent>(response);
		} catch (error) {
			return Result.fail<ErrorGraphql>(
				ErrorGraphql.create(error as ApolloError)
			);
		}
	}
}
