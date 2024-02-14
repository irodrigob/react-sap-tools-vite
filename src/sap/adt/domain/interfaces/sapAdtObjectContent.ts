import {
	ADTObjectVersion,
	ResponseAdtObjectContent,
} from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export interface SAPAdtObjectContentInterface {
	getObjectContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion
	): Promise<ResponseAdtObjectContent>;
}
