import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
  responseMetadata,
  responseGetUserInfoRepo,
  responseGetAppsList,
} from "sap/general/infraestructure/types/general";
import SAPFormatters from "sap/general/infraestructure/utils/formatters";
import AppStore from "shared/storage/appStore";
import SAPGeneralRepository from "sap/general/infraestructure/repositories/SAPGeneralRepository";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SystemController from "systems/infraestructure/controller/systemController";

export default class SAPGeneralApplication {
  private SAPGeneralActions: SAPGeneralActions;
  private SAPGeneralRepository: SAPGeneralRepository;
  private appStore: AppStore;
  private systemController: SystemController;

  constructor() {
    this.SAPGeneralRepository = new SAPGeneralRepository();
    this.SAPGeneralActions = new SAPGeneralActions();
    this.appStore = new AppStore();
    this.systemController = new SystemController();
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
      let connectionApp = dataConnection;
      response.forEach((row) => {
        connectionApp.host = this.getURLConnectionApp(row.app);
        this.callMetaData(connectionApp);
      });

      return Result.ok<AppsList[]>(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Devuelve la URL de conexión de una aplicación
   * @param app | Aplicación
   * @returns | URL de conexión
   */
  getURLConnectionApp(app: string): string {
    let service =
      this.appStore.getState().SAPGeneral.appsList.find((row) => row.app == app)
        ?.service ?? "";

    return this.buildSAPUrl2Connect(
      this.systemController.getURL2ConnectSystem(),
      service
    );
  }
  /**
   * Devuelve la URL completa para la conexión al sistema SAP
   * @param host | Host del sistema
   * @param service | Servicio
   * @returns URL completa del servicio
   */
  buildSAPUrl2Connect(host: string, service?: string): string {
    return SAPFormatters.buildSAPUrl2Connect(host, service);
  }
}
