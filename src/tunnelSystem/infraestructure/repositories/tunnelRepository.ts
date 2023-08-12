import TunnelRepositoryInterface from "tunnelSystem/domain/interfaces/tunnelRepositoryInterface";
import { gql } from "@apollo/client";
import Tunnel from "tunnelSystem/domain/entities/tunnel";
import graphQLRepository from "shared/infraestructure/repository/graphQLRepository";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import TunnelProvider from "tunnelSystem/domain/entities/provider";
import { rejects } from "assert";

export const QUERY_TUNNELS = gql`
  query Query($apiToken: String!) {
    getTunnelsList(apiToken: $apiToken) {
      forwards_to
      id
      proto
      public_url
      started_at
    }
  }
`;

export const QUERY_CONFIGURATION = gql`
  query Query($user: String!) {
    getTunnelConfiguration(user: $user) {
      _id
      user
      provider
      authToken
      apiToken
    }
  }
`;

export const MUTATION_EDIT_CONFIGURATION = gql`
  mutation Mutation(
    $id: String!
    $user: String!
    $input: InputTunnelConfiguration
  ) {
    editTunnelConfiguration(id: $id, user: $user, input: $input) {
      _id
      user
      provider
      authToken
      apiToken
    }
  }
`;

export default class TunnelRepository
  extends graphQLRepository
  implements TunnelRepositoryInterface
{
  async getTunnels(apiToken: string): Promise<Tunnel[]> {
    const response = await this._apolloClient.query({
      query: QUERY_TUNNELS,
      fetchPolicy: "network-only",
      variables: {
        apiToken: apiToken,
      },
    });

    return response.data.getTunnelsList.map((row: any) => {
      return new Tunnel(
        row.forwards_to,
        row.id,
        row.proto,
        row.public_url,
        row.started_at
      );
    });
  }
  async getConfiguration(user: string): Promise<TunnelConfiguration> {
    const response = await this._apolloClient.query({
      query: QUERY_CONFIGURATION,
      fetchPolicy: "network-only",
      variables: {
        user: user,
      },
    });
    if (response.data.getTunnelConfiguration) {
      return new TunnelConfiguration(
        response.data.getTunnelConfiguration._id,
        response.data.getTunnelConfiguration.user,
        response.data.getTunnelConfiguration.authToken,
        response.data.getTunnelConfiguration.apiToken,
        response.data.getTunnelConfiguration.provider
      );
    } else {
      return new TunnelConfiguration("", "", "", "", "");
    }
  }
  async editConfiguration(
    configuration: TunnelConfiguration
  ): Promise<TunnelConfiguration> {
    const response = await this._apolloClient.mutate({
      mutation: MUTATION_EDIT_CONFIGURATION,
      variables: {
        id: configuration._id,
        user: configuration.user,
        input: {
          provider: configuration.provider,
          authToken: configuration.authToken,
          apiToken: configuration.apiToken,
        },
      },
    });
    let updatedConf = response.data
      .editTunnelConfiguration as TunnelConfiguration;
    return new TunnelConfiguration(
      updatedConf._id,
      updatedConf.user,
      updatedConf.authToken,
      updatedConf.apiToken,
      updatedConf.provider
    );
  }
  async getTunnelProviders(): Promise<TunnelProvider[]> {
    let providers: TunnelProvider[] = [];

    providers.push(new TunnelProvider("NGROK", "Ngrok"));

    return new Promise((resolve, reject) => {
      resolve(providers as TunnelProvider[]);
    });
  }
}
