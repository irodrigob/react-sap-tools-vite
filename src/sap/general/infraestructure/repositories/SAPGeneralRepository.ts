import { gql } from "@apollo/client";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import SAPRepositoryInterface from "sap/general/domain/interfaces/sapRepositoryInterface";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import { metadataDTO } from "../dto/metadataDTO";

export const QUERY_METADATA = gql`
  query Query($system: String!, $sap_user: String!, $sap_password: String!) {
    getMetadata(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
    ) {
      content
    }
  }
`;

export const QUERY_GET_USER_INFO = gql`
  query Query($system: String!, $sap_user: String!, $sap_password: String!) {
    getUserInfo(
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
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
    $langu: String!
  ) {
    getAppsList(
      langu: $langu
      system: $system
      sap_user: $sap_user
      sap_password: $sap_password
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
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<metadataDTO> {
    const response = await this._apolloClient.query({
      query: QUERY_METADATA,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
      },
    });
    return {
      content: response.data.getMetadata.content,
    };
  }
  async getUserInfo(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<UserInfo> {
    const response = await this._apolloClient.query({
      query: QUERY_GET_USER_INFO,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
      },
    });

    return new UserInfo(
      response.data.getUserInfo.username,
      response.data.getUserInfo.username_desc
    );
  }
  async getAppsList(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string
  ): Promise<AppsList[]> {
    const response = await this._apolloClient.query({
      query: QUERY_GET_APPS_LIST,
      fetchPolicy: "network-only",
      variables: {
        system: system,
        sap_user: sapUser,
        sap_password: sapPassword,
        langu: language,
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
