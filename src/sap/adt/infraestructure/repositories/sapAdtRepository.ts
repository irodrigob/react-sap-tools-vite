import { gql } from "@apollo/client";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import SAPAdtInterface from "sap/adt/domain/interfaces/sapAdtInterface";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import {
	ADTFavoritePackagesDTO,
	ADTFavoritePackageDTO,
} from "sap/adt/infraestructure/dto/favoritePackagesDTO";

const SEARCH_OBJECT_SINGLE_TYPE = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$objectType: String!
		$legacyType: String!
		$searchQuery: String!
	) {
		adtSearchObjectSingleType(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			objectType: $objectType
			legacyType: $legacyType
			searchQuery: $searchQuery
		) {
			uri
			type
			name
			packageName
		}
	}
`;

const QUICK_SEARCH_OBJECT = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$objectType: String!
		$searchQuery: String!
	) {
		adtQuickSearch(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			objectType: $objectType
			searchQuery: $searchQuery
		) {
			uri
			type
			name
			packageName
		}
	}
`;

const GET_FAVORITE_PACKAGES = gql`
	query Query($user: String!) {
		adtFavoritePackages(user: $user) {
			_id
			user
			packageName
		}
	}
`;

const MUTATION_ADD_FAVORITE_PACKAGE = gql`
	mutation Mutation($input: InputAddFavoritePackage) {
		newFavoritePackage(input: $input) {
			packageName
			user
			_id
		}
	}
`;

export const MUTATION_DELETE_FAVORITE_PACKAGE = gql`
	mutation Mutation($id: String!) {
		deleteFavoritePackage(id: $id) {
			packageName
			user
			_id
		}
	}
`;

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
}
