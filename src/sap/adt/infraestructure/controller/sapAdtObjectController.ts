import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import ADTClassObject from "sap/adt/application/adtClassApplication";
import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
} from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { Result } from "shared/core/Result";
import ErrorGeneral from "shared/errors/errorGeneral";

export default class SAPAdtObjectController {
	private objectContent: SAPAdtObjectContentInterface | undefined;
	constructor(objectType: string) {
		if (objectType.includes("CLAS")) this.objectContent = new ADTClassObject();
	}
	/**
	 * Devuelve el contenido de una clase
	 * @param dataConnection Datos del conexión
	 * @param objectType Tipo de objeto
	 * @param objectUri URL de la clase
	 * @param Objectversion Versión de la clase
	 */
	async getObjectContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		objectversion?: ADTObjectVersion
	): Promise<ResponseAdtObjectContent> {
		if (this.objectContent)
			return this.objectContent.getObjectContent(
				dataConnection,
				objectUri,
				objectversion
			);

		return Result.fail<ErrorGeneral>(ErrorGeneral.create("Not implemented"));
	}
}
