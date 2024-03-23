import { gql } from "@apollo/client";

export const SEARCH_OBJECT_SINGLE_TYPE = gql`
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

export const QUICK_SEARCH_OBJECT = gql`
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

export const GET_FAVORITE_PACKAGES = gql`
	query Query($user: String!) {
		adtFavoritePackages(user: $user) {
			_id
			user
			packageName
		}
	}
`;

export const MUTATION_ADD_FAVORITE_PACKAGE = gql`
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

export const PACKAGE_CONTENT = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$packageName: String!
	) {
		adtPackageReadContent(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			packageName: $packageName
		) {
			level
			objectName
			objectNameParent
			objectType
			objectTypeDesc
			techName
			categories {
				categoryDesc
				category
				objectTypes {
					objectType
					objectTypeDesc
					objects {
						objectUri
						objectName
						techName
					}
				}
			}
		}
	}
`;

export const CLASS_CONTENT = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$objectUri: String!
		$objectVersion: String
	) {
		adtClassContent(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			objectUri: $objectUri
			objectVersion: $objectVersion
		) {
			metadata {
				modeled
				activeUnicodeCheck
				fixPointArithmetic
				changedAt
				changedBy
				createdAt
				createdBy
				description
				descriptionTextLimit
				language
				masterLanguage
				masterSystem
				name
				responsible
				type
				version
				abstract
				category
				final
				sharedMemoryEnabled
				visibility
				packageRefName
				packageRefType
			}
			sourceIncludes {
				sourceUri
				contentSource
				changedAt
				changedBy
				createdAt
				createdBy
				name
				type
				version
				includeType
			}
		}
	}
`;

export const READ_OBJECT_STRUCTURE = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$objectUri: String!
	) {
		adtReadObjectStructure(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			objectUri: $objectUri
		) {
			name
			type
			typeDesc
			structureElements {
				name
				type
				typeDesc
				visibility
				sourceUri
				isConstructor
				isEventHandlerMethod
				isRedefinition
				isReadOnly
				isConstant
				blockInfo {
					block
					startPos
					endPos
				}
			}
		}
	}
`;

export const OBJECT_CHECK = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
		$objectUri: String!
	) {
		adtObjectCheck(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
			objectUri: $objectUri
		) {
			statusText
			status
			triggeringUri
			messagesList {
				shortText
				type
				pos
				quickFix
			}
		}
	}
`;

export const REPOSITORY_CHECK_RUN = gql`
	query Query(
		$system: String!
		$sap_user: String!
		$sap_password: String!
		$language: String!
		$client: String!
	) {
		adtRepositoryCheckRun(
			system: $system
			sap_user: $sap_user
			sap_password: $sap_password
			language: $language
			client: $client
		) {
			type
		}
	}
`;
