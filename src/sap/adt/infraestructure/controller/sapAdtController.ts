import { Result } from "shared/core/Result";
import {
	ResponseSearchObject,
	ResponseAddFavoritePackage,
	ResponseDeleteFavoritePackage,
	ResponseFavoritePackages,
} from "sap/adt/infraestructure/types/adt";
import AppStore from "shared/storage/appStore";
import AdtApplication from "sap/adt/application/adtApplication";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class SAPAdtController {
	private appStore: AppStore;
	private adtApplication: AdtApplication;

	constructor() {
		this.appStore = new AppStore();
		this.adtApplication = new AdtApplication();
	}
	/**
	 * Búsqueda de objeto por un tipo/subtipo de objetos
	 * @param objectType
	 * @param legacyType
	 * @param searchQuery
	 */
	searchObjectSingleType(
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ResponseSearchObject> {
		return this.adtApplication.searchObjectSingleType(
			this.getDataForConnection(),
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
	 * @param id Id del paquete favorito
	 */
	async deleteFavoritePackage(
		id: string
	): Promise<ResponseDeleteFavoritePackage> {
		return this.adtApplication.deleteFavoritePackage(id);
	}
	/**
	 * Devuelve los datos de conexión al sistema
	 * @returns Objetos con los datos de conexión al sistema
	 */
	getDataForConnection(app?: string): DataConnectionSystem {
		return {
			host: this.appStore.getState().System.URL2ConnectSystem,
			sap_user: this.appStore.getState().System.systemSelected.sap_user,
			sap_password: this.appStore.getState().System.systemSelected.sap_password,
			client: this.appStore.getState().System.systemSelected.client,
			language: this.appStore.getState().System.systemSelected.language,
		};
	}
}
