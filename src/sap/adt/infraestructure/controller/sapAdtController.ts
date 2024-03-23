import {
	ResponseSearchObject,
	ResponseAddFavoritePackage,
	ResponseDeleteFavoritePackage,
	ResponseFavoritePackages,
	ResponsePackageContent,
	ResponseRepositoryCheckRuns,
} from "sap/adt/infraestructure/types/adt";
import AdtApplication from "sap/adt/application/adtApplication";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class SAPAdtController {
	private adtApplication: AdtApplication;

	constructor() {
		this.adtApplication = new AdtApplication();
	}
	/**
	 * Búsqueda de objeto por un tipo/subtipo de objetos
	 * @param objectType
	 * @param legacyType
	 * @param searchQuery
	 */
	searchObjectSingleType(
		dataConnection: DataConnectionSystem,
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		return this.adtApplication.searchObjectSingleType(
			dataConnection,
			objectType,
			legacyType,
			searchQuery
		);
	}
	/**
	 * Búsqueda rapido de objeto por tipo
	 * @param objectType
	 * @param legacyType
	 * @param searchQuery
	 */
	quickSearch(
		dataConnection: DataConnectionSystem,
		objectType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		return this.adtApplication.quickSearch(
			dataConnection,
			objectType,
			searchQuery
		);
	}
	/**
	 * Añade un paquete favorito
	 * @param user Usuario
	 * @param packageName Nombre del paquete
	 */
	async AddFavoritePackage(
		user: string,
		packageName: string
	): Promise<ResponseAddFavoritePackage> {
		return this.adtApplication.AddFavoritePackage(user, packageName);
	}
	/**
	 * Devuelve los paquetes favoritos de un usuario
	 * @param user Usuario
	 */
	async getFavoritePackages(user: string): Promise<ResponseFavoritePackages> {
		return this.adtApplication.getFavoritePackages(user);
	}
	/**
	 * Borra un paquete favorito
	 * @param packageName Id del paquete favorito
	 */
	async deleteFavoritePackage(
		packageName: string
	): Promise<ResponseDeleteFavoritePackage> {
		return this.adtApplication.deleteFavoritePackage(packageName);
	}
	/**
	 * Devuelve el contenido de un paquete y sus posibles subpaquetes
	 * @param packageName Nombre del paquete
	 * @param dataConnection: DataConnectionSystem,
	 */
	async getPackageContent(
		dataConnection: DataConnectionSystem,
		packageName: string
	): Promise<ResponsePackageContent> {
		return this.adtApplication.getPackageContent(dataConnection, packageName);
	}
	/**
	 * Recupera los tipos de objeto que se pueden lanzar su validación
	 * @param dataConnection Datos de conexión
	 */
	async repositoryCheckRun(
		dataConnection: DataConnectionSystem
	): Promise<ResponseRepositoryCheckRuns> {
		return this.adtApplication.repositoryCheckRun(dataConnection);
	}
}
