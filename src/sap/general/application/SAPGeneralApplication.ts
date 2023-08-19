import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
  responseMetadata,
  responseGetUserInfoRepo,
  responseGetAppsList,
} from "sap/general/infraestructure/types/general";
import SAPGeneralRepository from "sap/general/infraestructure/repositories/SAPGeneralRepository";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class SAPGeneralApplication {
  private SAPGeneralActions: SAPGeneralActions;
  private SAPGeneralRepository: SAPGeneralRepository;
  constructor() {
    this.SAPGeneralRepository = new SAPGeneralRepository();
    this.SAPGeneralActions = new SAPGeneralActions();
  }
  /**
   * Llama al servicio al metadata del core
   *@param dataConnection | Datos conexión sistema
   */
  async callMetaData(
    dataConnection: DataConnectionSystem
  ): Promise<responseMetadata> {
    try {
      let response = await this.SAPGeneralRepository.callMetadataCore(
        dataConnection
      );
      return Result.ok<responseMetadata>(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Obtiene información del usuario de conexión
   * @param dataConnection | Datos conexión sistema
   */
  async readUserInfo(
    dataConnection: DataConnectionSystem
  ): Promise<responseGetUserInfoRepo> {
    try {
      let response = await this.SAPGeneralRepository.getUserInfo(
        dataConnection
      );
      this.SAPGeneralActions.setUserInfo(response);

      return Result.ok<UserInfo>(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Obtiene la lista de aplicaciones configuradas
   * @param dataConnection | Datos conexión sistema
   */
  async readAppsList(
    dataConnection: DataConnectionSystem
  ): Promise<responseGetAppsList> {
    try {
      let response = await this.SAPGeneralRepository.getAppsList(
        dataConnection
      );
      this.SAPGeneralActions.setAppsList(response);
      this.SAPGeneralActions.setLoadingListApps(false);

      // Por cada aplicación llamo a su metadata
      response.forEach((row) => {
        this.callMetaData(dataConnection);
      });

      return Result.ok<AppsList[]>(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
}
