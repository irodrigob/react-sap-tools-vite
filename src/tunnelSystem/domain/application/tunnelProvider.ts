import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { responseTunnelProviderRepoArray } from "tunnelSystem/infraestructure/types/repository";
import TunnelRepository from "tunnelSystem/infraestructure/repositories/tunnelRepository";
import TunnelProvider from "tunnelSystem/domain/entities/provider";

export default class TunnelProviderApplication {
  private tunnelRepository: TunnelRepository;

  constructor() {
    this.tunnelRepository = new TunnelRepository();
  }

  /**
   * Devuelve la configuración del usuario para el tunel
   * @param user | Usuario
   * @returns | Promise con el resultado o error del proceso
   */
  async getProviders(): Promise<responseTunnelProviderRepoArray> {
    try {
      let data = await this.tunnelRepository.getTunnelProviders();
      return Result.ok<TunnelProvider[]>(data);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
}
