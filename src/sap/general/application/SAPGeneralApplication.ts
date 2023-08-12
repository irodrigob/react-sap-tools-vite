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
import SAPFormatters from "sap/general/infraestructure/utils/formatters";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import AppStore from "shared/storage/appStore";

export default class SAPGeneralApplication {
  private appStore: AppStore;
  private SAPGeneralActions: SAPGeneralActions;
  private SAPGeneralRepository: SAPGeneralRepository;
  constructor() {
    this.appStore = new AppStore();
    this.SAPGeneralRepository = new SAPGeneralRepository();
    this.SAPGeneralActions = new SAPGeneralActions();
  }
  /**
   * Llama al servicio al metadata del core
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   */
  async callMetaData(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<responseMetadata> {
    try {
      let response = await this.SAPGeneralRepository.callMetadataCore(
        system,
        sapUser,
        sapPassword
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
   * @param sapUser | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   */
  async readUserInfo(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<responseGetUserInfoRepo> {
    try {
      let response = await this.SAPGeneralRepository.getUserInfo(
        system,
        sapUser,
        sapPassword
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
   * @param sapUser | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   */
  async readAppsList(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string
  ): Promise<responseGetAppsList> {
    try {
      let response = await this.SAPGeneralRepository.getAppsList(
        system,
        sapUser,
        sapPassword,
        language
      );
      this.SAPGeneralActions.setAppsList(response);
      this.SAPGeneralActions.setLoadingListApps(false);

      // Por cada aplicación llamo a su metadata
      response.forEach((row) => {
        let urlConnect = SAPFormatters.buildSAPUrl2Connect(
          this.appStore.getState().System.systemSelected.host,
          row.service
        );
        this.callMetaData(urlConnect, sapUser, sapPassword);
      });

      return Result.ok<AppsList[]>(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
}
