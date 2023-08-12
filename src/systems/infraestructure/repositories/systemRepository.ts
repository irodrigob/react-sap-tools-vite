import { gql } from "@apollo/client";
import System from "systems/domain/entities/system";
import SystemRepositoryInterface from "systems/domain/interfaces/systemRepositoryInterface";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";

import type { newSystemDTO } from "systems/infraestructure/dto/systemDTO";

export const MAIN_SYSTEMS_FIELDS = gql`
  fragment MainSystemsFields on Systems {
    _id
    user
    name
    host
    sap_user
    sap_password
    use_connection_tunnel
    url_manual_tunnel
  }
`;

export const QUERY_USER_SYSTEMS = gql`
  query Query($user: String!) {
    getSystemsByUser(user: $user) {
      ...MainSystemsFields
    }
  }
  ${MAIN_SYSTEMS_FIELDS}
`;

export const MUTATION_NEW_SYSTEM = gql`
  mutation Mutation($input: InputSystems) {
    newSystem(input: $input) {
      ...MainSystemsFields
    }
  }
  ${MAIN_SYSTEMS_FIELDS}
`;

export const MUTATION_UPDATE_SYSTEM = gql`
  mutation Mutation($id: String!, $input: InputSystems) {
    updateSystem(id: $id, input: $input) {
      ...MainSystemsFields
    }
  }
  ${MAIN_SYSTEMS_FIELDS}
`;

export const MUTATION_DELETE_SYSTEM = gql`
  mutation Mutation($id: String!) {
    deleteSystem(id: $id) {
      ...MainSystemsFields
    }
  }
  ${MAIN_SYSTEMS_FIELDS}
`;

export default class SystemRepository
  extends graphQLRepository
  implements SystemRepositoryInterface
{
  async getUserSystems(user: String): Promise<System[]> {
    const response = await this._apolloClient.query({
      query: QUERY_USER_SYSTEMS,
      fetchPolicy: "network-only",
      variables: {
        user: user,
      },
    });

    return response.data.getSystemsByUser.map((row: any) => {
      return new System(
        row._id,
        row.user,
        row.name,
        row.host,
        row.sap_user,
        row.sap_password,
        row.use_connection_tunnel,
        row.url_manual_tunnel
      );
    });
  }
  async saveNewSystem(newSystem: newSystemDTO): Promise<System> {
    const response = await this._apolloClient.mutate({
      mutation: MUTATION_NEW_SYSTEM,
      variables: {
        input: {
          user: newSystem.user,
          name: newSystem.name,
          host: newSystem.host,
          sap_password: newSystem.sap_password,
          sap_user: newSystem.sap_user,
          use_connection_tunnel: newSystem.use_connection_tunnel,
          url_manual_tunnel: newSystem.url_manual_tunnel,
        },
      },
    });

    return new System(
      response.data.newSystem._id,
      response.data.newSystem.user,
      response.data.newSystem.name,
      response.data.newSystem.host,
      response.data.newSystem.sap_user,
      response.data.newSystem.sap_password,
      response.data.newSystem.use_connection_tunnel,
      response.data.newSystem.url_manual_tunnel
    );
  }
  async updateSystem(system: System): Promise<System> {
    const response = await this._apolloClient.mutate({
      mutation: MUTATION_UPDATE_SYSTEM,
      variables: {
        id: system._id,
        input: {
          user: system.user,
          name: system.name,
          host: system.host,
          sap_password: system.sap_password,
          sap_user: system.sap_user,
          use_connection_tunnel: system.use_connection_tunnel,
          url_manual_tunnel: system.url_manual_tunnel,
        },
      },
    });
    return new System(
      response.data.updateSystem._id,
      response.data.updateSystem.user,
      response.data.updateSystem.name,
      response.data.updateSystem.host,
      response.data.updateSystem.sap_user,
      response.data.updateSystem.sap_password,
      response.data.updateSystem.use_connection_tunnel,
      response.data.updateSystem.url_manual_tunnel
    );
  }
  async deleteSystem(IDSystem: string): Promise<System> {
    const response = await this._apolloClient.mutate({
      mutation: MUTATION_DELETE_SYSTEM,
      variables: {
        id: IDSystem,
      },
    });
    let deletedSystem = response.data.deleteSystem as System;
    return new System(
      deletedSystem._id,
      deletedSystem.user,
      deletedSystem.name,
      deletedSystem.host,
      deletedSystem.sap_user,
      deletedSystem.sap_password,
      deletedSystem.use_connection_tunnel,

      deletedSystem.url_manual_tunnel
    );
  }
}
