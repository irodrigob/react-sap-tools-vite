import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
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
}
