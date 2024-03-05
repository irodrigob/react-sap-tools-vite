import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
	ResponseObjectStructure,
} from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export interface SAPAdtObjectContentInterface {
	/**
	 * Obtiene el contenio de un objeto
	 * @param dataConnection
	 * @param objectUri
	 * @param Objectversion
	 */
	getObjectContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion
	): Promise<ResponseAdtObjectContent>;
	/**
	 * Devuelve la estructura de un objeto.
	 * En el caso de clases devuelve los metodos, tipos de datos, etc..
	 * @param dataConnection Datosd de conexión
	 * @param objectUri URL del objeto
	 */
	getObjectReadStructure(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ResponseObjectStructure>;
}
