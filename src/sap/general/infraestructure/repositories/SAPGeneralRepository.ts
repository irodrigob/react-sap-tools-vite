import { gql } from "@apollo/client";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import SAPRepositoryInterface from "sap/general/domain/interfaces/sapRepositoryInterface";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import { metadataDTO } from "../dto/metadataDTO";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

const QUERY_METADATA = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		getMetadata(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			content
		}
	}
`;

const QUERY_GET_USER_INFO = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		getUserInfo(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			username
			username_desc
		}
	}
`;

export const QUERY_GET_APPS_LIST = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		getAppsList(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			app
			appDesc
			service
			frontendPage
			icon
			urlHelp
		}
	}
`;

export default class SAPGeneralRepository
	extends graphQLRepository
	implements SAPRepositoryInterface
{
	async callMetadataCore(
		dataConnection: DataConnectionSystem
	): Promise<metadataDTO> {
		const response = await this._apolloClient.query({
			query: QUERY_METADATA,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
			},
		});
		return {
			content: response.data.getMetadata.content,
		};
	}
	async getUserInfo(dataConnection: DataConnectionSystem): Promise<UserInfo> {
		const response = await this._apolloClient.query({
			query: QUERY_GET_USER_INFO,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
			},
		});

		return new UserInfo(
			response.data.getUserInfo.username,
			response.data.getUserInfo.username_desc
		);
	}
	async getAppsList(dataConnection: DataConnectionSystem): Promise<AppsList[]> {
		const response = await this._apolloClient.query({
			query: QUERY_GET_APPS_LIST,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				client: dataConnection.client,
				language: dataConnection.language,
			},
		});
		return response.data.getAppsList.map((row: any) => {
			return new AppsList(
				row.app,
				row.appDesc,
				row.service,
				row.frontendPage,
				row.icon,
				row.urlHelp
			);
		});
	}
}
