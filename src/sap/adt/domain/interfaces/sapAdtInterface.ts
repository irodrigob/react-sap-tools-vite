import { ResponseSearchObject } from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { ADTSearchObjects } from "../entities/searchObject";

export default interface SAPAdtInterface {
	/**
	 * Búsqueda de objeto por un tipo/subtipo de objetos
	 * @param objectType Tipo de objeto
	 * @param legacyType Subtipo de objeto
	 * @param searchQuery Texto del objeto a buscar
	 */
	searchObjectSingleType(
		dataConnection: DataConnectionSystem,
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ADTSearchObjects>;
	/**
	 * Búsqueda rápida de objetos por tipo
	 * @param objectType Tipo de objeto
	 * @param searchQuery Texto del objeto a buscar
	 */
	quickSearchObject(
		dataConnection: DataConnectionSystem,
		objectType: string,
		searchQuery: string
	): Promise<ADTSearchObjects>;
}
