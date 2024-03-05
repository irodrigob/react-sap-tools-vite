import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import SAPAdtInterface from "sap/adt/domain/interfaces/sapAdtInterface";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTFavoritePackagesDTO,
	ADTFavoritePackageDTO,
} from "sap/adt/infraestructure/dto/favoritePackagesDTO";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import { ADTClassContent } from "@/sap/adt/domain/entities/classContent";
import {
	GET_FAVORITE_PACKAGES,
	MUTATION_ADD_FAVORITE_PACKAGE,
	MUTATION_DELETE_FAVORITE_PACKAGE,
	QUICK_SEARCH_OBJECT,
	SEARCH_OBJECT_SINGLE_TYPE,
	PACKAGE_CONTENT,
	CLASS_CONTENT,
	READ_OBJECT_STRUCTURE,
} from "./graphqlSchema";
import { ADTObjectVersion } from "sap/adt/infraestructure/types/adt";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";

export default class SAPAdtRepository
	extends graphQLRepository
	implements SAPAdtInterface
{
	async searchObjectSingleType(
		dataConnection: DataConnectionSystem,
		objectType: string,
		legacyType: string,
		searchQuery: string
	): Promise<ADTSearchObjects> {
		const response = await this._apolloClient.query({
			query: SEARCH_OBJECT_SINGLE_TYPE,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
				objectType: objectType,
				legacyType: legacyType,
				searchQuery: searchQuery,
			},
		});
		return response.data.adtSearchObjectSingleType;
	}
	async quickSearchObject(
		dataConnection: DataConnectionSystem,
		objectType: string,
		searchQuery: string
	): Promise<ADTSearchObjects> {
		const response = await this._apolloClient.query({
			query: QUICK_SEARCH_OBJECT,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
				objectType: objectType,
				searchQuery: searchQuery,
			},
		});
		return response.data.adtQuickSearch;
	}
	/**
	 * Añade un paquete favorito
	 * @param user Usuario
	 * @param packageName Nombre del paquete
	 */
	async AddFavoritePackage(
		user: string,
		packageName: string
	): Promise<ADTFavoritePackageDTO> {
		const response = await this._apolloClient.mutate({
			mutation: MUTATION_ADD_FAVORITE_PACKAGE,
			variables: {
				input: {
					user: user,
					packageName: packageName,
				},
			},
		});
		return response.data.newFavoritePackage;
	}
	/**
	 * Devuelve los paquetes favoritos de un usuario
	 * @param user Usuario
	 */
	async getFavoritePackages(user: string): Promise<ADTFavoritePackagesDTO> {
		const response = await this._apolloClient.query({
			query: GET_FAVORITE_PACKAGES,
			fetchPolicy: "network-only",
			variables: {
				user: user,
			},
		});
		return response.data.adtFavoritePackages;
	}
	/**
	 * Borra un paquete favorito
	 * @param id Id del paquete favorito
	 */
	async deleteFavoritePackage(id: string): Promise<ADTFavoritePackageDTO> {
		const response = await this._apolloClient.mutate({
			mutation: MUTATION_DELETE_FAVORITE_PACKAGE,
			variables: {
				id: id,
			},
		});
		return response.data.deleteFavoritePackage;
	}
	/**
	 * Devuelve el contenido de un paquete y sus posibles subpaquetes
	 * @param packageName Nombre del paquete
	 * @param dataConnection: DataConnectionSystem,
	 */
	async getPackageContent(
		dataConnection: DataConnectionSystem,
		packageName: string
	): Promise<AdtPackageContents> {
		const response = await this._apolloClient.query({
			query: PACKAGE_CONTENT,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
				packageName: packageName,
			},
		});
		return response.data.adtPackageReadContent;
	}
	/**
	 * Devuelve el contenido de una clase
	 * @param dataConnection Datos del conexión
	 * @param objectUri URL de la clase
	 * @param Objectversion Versión de la clase
	 */
	async getClassContent(
		dataConnection: DataConnectionSystem,
		objectUri: string,
		Objectversion?: ADTObjectVersion
	): Promise<ADTClassContent> {
		const response = await this._apolloClient.query({
			query: CLASS_CONTENT,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
				objectUri: objectUri,
				objectVersion: Objectversion ?? ADTObjectVersion.active,
			},
		});
		return response.data.adtClassContent;
	}
	/**
	 * Devuelve el contenido de una clase
	 * @param dataConnection Datos del conexión
	 * @param objectUri URL de la clase
	 * @param Objectversion Versión de la clase
	 */
	async getObjectStructure(
		dataConnection: DataConnectionSystem,
		objectUri: string
	): Promise<ADTObjectStructure> {
		const response = await this._apolloClient.query({
			query: READ_OBJECT_STRUCTURE,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
				objectUri: objectUri,
			},
		});
		return response.data.adtReadObjectStructure;
	}
}
