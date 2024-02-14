import SAPAdtRepository from "sap/adt/infraestructure/repositories/sapAdtRepository";
import { SAPAdtObjectContentInterface } from "sap/adt/domain/interfaces/sapAdtObjectContent";
import ADTClassObject from "./adtClassApplication";

export default class AdtBaseObject {
	protected adtRepository: SAPAdtRepository;

	constructor() {
		this.adtRepository = new SAPAdtRepository();
	}
	static getInstance(
		objectType: string
	): SAPAdtObjectContentInterface | undefined {
		if (objectType.includes("CLAS")) return new ADTClassObject();
	}
}
