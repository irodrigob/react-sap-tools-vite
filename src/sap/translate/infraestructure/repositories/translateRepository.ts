import { gql } from "@apollo/client";
import TranslateRepositoryInterface from "sap/translate/domain/interfaces/translateRepositoryInterface";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import {
	Languages,
	ObjectsText,
	SelectableObjects,
	ParamsObjectTranslate,
	ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export const QUERY_GET_LANGUAGES = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		getLanguages(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			language
			description
			isSystemLanguage
		}
	}
`;

export const QUERY_SELECTABLE_OBJECTS = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		getSelectableObjects(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			pgmid
			object
			text
		}
	}
`;

export const GET_OBJECT_TRANSLATE = gql`
	mutation Mutation($input: inputGetObjectTranslate) {
		getObjectTranslate(input: $input) {
			object
			objName
			objType
			idText
			langOlang
			colOlang
			txtOlang
			langTlang1
			colTlang1
			txtTlang1
			ppsalTypeTlang1
			langTlang2
			colTlang2
			txtTlang2
			ppsalTypeTlang2
			langTlang3
			colTlang3
			txtTlang3
			ppsalTypeTlang3
			langTlang4
			colTlang4
			txtTlang4
			ppsalTypeTlang4
			langTlang5
			colTlang5
			txtTlang5
			ppsalTypeTlang5
			langTlang6
			colTlang6
			txtTlang6
			ppsalTypeTlang6
			langTlang7
			colTlang7
			txtTlang7
			ppsalTypeTlang7
			langTlang8
			colTlang8
			txtTlang8
			ppsalTypeTlang8
			langTlang9
			colTlang9
			txtTlang9
			ppsalTypeTlang9
			langTlang10
			colTlang10
			txtTlang10
			ppsalTypeTlang10
		}
	}
`;

export const SET_OBJECT_TRANSLATE = gql`
	mutation Mutation($input: inputSetObjectTranslate) {
		setObjectTranslate(input: $input) {
			objectText {
				object
				objName
				objType
				idText
				langOlang
				colOlang
				txtOlang
				langTlang1
				colTlang1
				txtTlang1
				ppsalTypeTlang1
				langTlang2
				colTlang2
				txtTlang2
				ppsalTypeTlang2
				langTlang3
				colTlang3
				txtTlang3
				ppsalTypeTlang3
				langTlang4
				colTlang4
				txtTlang4
				ppsalTypeTlang4
				langTlang5
				colTlang5
				txtTlang5
				ppsalTypeTlang5
				langTlang6
				colTlang6
				txtTlang6
				ppsalTypeTlang6
				langTlang7
				colTlang7
				txtTlang7
				ppsalTypeTlang7
				langTlang8
				colTlang8
				txtTlang8
				ppsalTypeTlang8
				langTlang9
				colTlang9
				txtTlang9
				ppsalTypeTlang9
				langTlang10
				colTlang10
				txtTlang10
				ppsalTypeTlang10
			}
			return {
				type
				message
			}
		}
	}
`;

export const QUERY_CHECK_OBJECT = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$object: String!
		$objectName: String!
	) {
		checkObject(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			object: $object
			objectName: $objectName
		)
	}
`;

export const QUERY_CHECK_ORDER = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$order: String!
	) {
		checkOrder(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			order: $order
		)
	}
`;

export default class TranslateRepository
	extends graphQLRepository
	implements TranslateRepositoryInterface
{
	async getLanguages(dataConnection: DataConnectionSystem): Promise<Languages> {
		const response = await this._apolloClient.query({
			query: QUERY_GET_LANGUAGES,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				language: dataConnection.language,
				client: dataConnection.client,
			},
		});
		return response.data.getLanguages;
	}

	async getSelectableObjects(
		dataConnection: DataConnectionSystem
	): Promise<SelectableObjects> {
		const response = await this._apolloClient.query({
			query: QUERY_SELECTABLE_OBJECTS,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				language: dataConnection.language,
				client: dataConnection.client,
			},
		});
		return response.data.getSelectableObjects;
	}
	async getObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate
	): Promise<ObjectsText> {
		const response = await this._apolloClient.mutate({
			mutation: GET_OBJECT_TRANSLATE,
			variables: {
				input: {
					system: dataConnection.host,
					sap_user: dataConnection.sap_user,
					sap_password: dataConnection.sap_password,
					language: dataConnection.language,
					client: dataConnection.client,
					...paramsTranslate,
				},
			},
		});
		return response.data.getObjectTranslate;
	}
	async saveObjectTranslate(
		dataConnection: DataConnectionSystem,
		paramsTranslate: ParamsObjectTranslate,
		objectsText: ObjectsText
	): Promise<ResponseSaveObjectText> {
		const response = await this._apolloClient.mutate({
			mutation: SET_OBJECT_TRANSLATE,
			variables: {
				input: {
					system: dataConnection.host,
					sap_user: dataConnection.sap_user,
					sap_password: dataConnection.sap_password,
					language: dataConnection.language,
					client: dataConnection.client,
					objectText: objectsText,
					...paramsTranslate,
				},
			},
		});
		return response.data.setObjectTranslate;
	}
	async checkObject(
		dataConnection: DataConnectionSystem,
		object: string,
		objectName: string
	): Promise<void> {
		const response = await this._apolloClient.query({
			query: QUERY_CHECK_OBJECT,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				language: dataConnection.language,
				client: dataConnection.client,
				object: object,
				objectName: objectName,
			},
		});
		return response.data.checkObject;
	}

	async checkOrder(
		dataConnection: DataConnectionSystem,
		order: string
	): Promise<void> {
		const response = await this._apolloClient.query({
			query: QUERY_CHECK_ORDER,
			fetchPolicy: "network-only",
			variables: {
				system: dataConnection.host,
				sap_user: dataConnection.sap_user,
				sap_password: dataConnection.sap_password,
				language: dataConnection.language,
				client: dataConnection.client,
				order: order,
			},
		});
		return response.data.checkOrder;
	}
}
