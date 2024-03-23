import { ADTObjectVersion } from "sap/adt/infraestructure/types/adt";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import {
	ADTFavoritePackagesDTO,
	ADTFavoritePackageDTO,
} from "sap/adt/infraestructure/dto/favoritePackagesDTO";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import { ADTClassContent } from "sap/adt/domain/entities/classContent";
import { ADTObjectCheckRun } from "sap/adt/domain/entities/objectCheckRun";
import { ADTRepositoryCheckRuns } from "sap/adt/domain/entities/repositoryCheckRun";

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
	/**
	 * Añade un paquete favorito
	 * @param user Usuario
	 * @param packageName Nombre del paquete
	 */
	AddFavoritePackage(
		user: string,
		packageName: string
	): Promise<ADTFavoritePackageDTO>;
	/**
	 * Devuelve los paquetes favoritos de un usuario
	 * @param user Usuario
	 */
	getFavoritePackages(user: string): Promise<ADTFavoritePackagesDTO>;
	/**
	 * Borra un paquete favorito
	 * @param id Id del paquete favorito
	 */
	deleteFavoritePackage(id: string): void;
	/**
	 * Devuelve el contenido de un paquete y sus posibles subpaquetes
	 * @param dataConnection Datos del conexión
	 * @param packageName Nombre del paquete
	 */
	getPackageContent(
		dataConnection: DataConnectionSystem,
		packageName: string
	): Promise<AdtPackageContents>;

	/**
	 * Devuelve el contenido de una clase
	 * @param dataConnection Datos del conexión
	 * @param objectUri URL de la clase
	 * @param Objectversion Versión de la clase
	 */
	getClassContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion
	): Promise<ADTClassContent>;
	/**
	 * Verifica que el objeto, se le pasa la URL, es sintacticamete correcto.
	 * @param dataConnection Datos de conexión
	 * @param objectUri URL del objeto
	 */
	objectCheck(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ADTObjectCheckRun>;
	/**
	 * Recupera los tipos de objeto que se pueden lanzar su validación
	 * @param dataConnection Datos de conexión
	 */
	repositoryCheckRun(
		dataConnection: DataConnectionSystem
	): Promise<ADTRepositoryCheckRuns>;
}
