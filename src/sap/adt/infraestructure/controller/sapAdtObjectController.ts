import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import ADTClassObject from "sap/adt/application/adtClassApplication";
import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
	ResponseObjectStructure,
} from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { Result } from "shared/core/Result";
import ErrorGeneral from "shared/errors/errorGeneral";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";
import AdtBaseObject from "sap/adt/application/adtBaseObject";

export default class SAPAdtObjectController {
	private objectContent: SAPAdtObjectContentInterface;
	constructor(objectType: string) {
		this.objectContent = this.getInstanceObject(objectType);
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
		return this.objectContent.getObjectContent(
			dataConnection,
			objectUri,
			objectversion
		);
	}
	/**
	 * Devuelve la estructura de un objeto.
	 * En el caso de clases devuelve los metodos, tipos de datos, etc..
	 * @param dataConnection Datosd de conexión
	 * @param objectUri URL del objeto
	 */
	getObjectReadStructure(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ResponseObjectStructure> {
		return this.objectContent.getObjectReadStructure(dataConnection, objectUri);
	}
	/**
	 * Devuelve la instancia de la clase según el tipo de objeto
	 * @param objectType Tipo de objeto
	 * @returns Clase instanciada del objeto
	 */
	private getInstanceObject(objectType: string) {
		if (objectType.includes(ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE))
			return new ADTClassObject();

		return new AdtBaseObject();
	}
}
