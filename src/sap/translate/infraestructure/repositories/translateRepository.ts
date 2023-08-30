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
      language
      description
      isSystemLanguage
    }
  }
`;

export const GET_OBJECT_TRANSLATE = gql`
  mutation Mutation($input: inputGetObjectTranslate) {
    getObjectTranslate(input: $input) {
      object: String
      objName: String
      objType: String
      idText: String
      langOlang: String
      colOlang: String
      txtOlang: String
      langTlang1: String
      colTlang1: String
      txtTlang1: String
      ppsalTypeTlang1: String
      langTlang2: String
      colTlang2: String
      txtTlang2: String
      ppsalTypeTlang2: String
      langTlang3: String
      colTlang3: String
      txtTlang3: String
      ppsalTypeTlang3: String
      langTlang4: String
      colTlang4: String
      txtTlang4: String
      ppsalTypeTlang4: String
      langTlang5: String
      colTlang5: String
      txtTlang5: String
      ppsalTypeTlang5: String
      langTlang6: String
      colTlang6: String
      txtTlang6: String
      ppsalTypeTlang6: String
      langTlang7: String
      colTlang7: String
      txtTlang7: String
      ppsalTypeTlang7: String
      langTlang8: String
      colTlang8: String
      txtTlang8: String
      ppsalTypeTlang8: String
      langTlang9: String
      colTlang9: String
      txtTlang9: String
      ppsalTypeTlang9: String
      langTlang10: String
      colTlang10: String
      txtTlang10: String
      ppsalTypeTlang10: String
    }
  }
`;

export const SET_OBJECT_TRANSLATE = gql`
  mutation Mutation($input: inputSetObjectTranslate) {
    setObjectTranslate(input: $input) {
      objectText {
        object: String
        objName: String
        objType: String
        idText: String
        langOlang: String
        colOlang: String
        txtOlang: String
        langTlang1: String
        colTlang1: String
        txtTlang1: String
        ppsalTypeTlang1: String
        langTlang2: String
        colTlang2: String
        txtTlang2: String
        ppsalTypeTlang2: String
        langTlang3: String
        colTlang3: String
        txtTlang3: String
        ppsalTypeTlang3: String
        langTlang4: String
        colTlang4: String
        txtTlang4: String
        ppsalTypeTlang4: String
        langTlang5: String
        colTlang5: String
        txtTlang5: String
        ppsalTypeTlang5: String
        langTlang6: String
        colTlang6: String
        txtTlang6: String
        ppsalTypeTlang6: String
        langTlang7: String
        colTlang7: String
        txtTlang7: String
        ppsalTypeTlang7: String
        langTlang8: String
        colTlang8: String
        txtTlang8: String
        ppsalTypeTlang8: String
        langTlang9: String
        colTlang9: String
        txtTlang9: String
        ppsalTypeTlang9: String
        langTlang10: String
        colTlang10: String
        txtTlang10: String
        ppsalTypeTlang10: String
      }
      return {
        type
        message
      }
    }
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
    ObjectsText: ObjectsText
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
          objectText: ObjectsText,
          ...paramsTranslate,
        },
      },
    });
    return response.data.setObjectTranslate;
  }
}
