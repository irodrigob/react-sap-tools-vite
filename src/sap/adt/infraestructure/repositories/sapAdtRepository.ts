import { gql } from "@apollo/client";
import { ADTSearchObjects } from "sap/adt/domain/entities/searchObject";
import SAPAdtInterface from "sap/adt/domain/interfaces/sapAdtInterface";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

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
}
