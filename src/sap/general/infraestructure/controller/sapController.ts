import i18n from "i18next";
import { Result } from "shared/core/Result";
import SAPFormatters from "sap/general/infraestructure/utils/formatters";
import {
  responseMetadata,
  responseGetUserInfoRepo,
  responseGetAppsList,
} from "sap/general/infraestructure/types/general";
import SAPGeneralApplication from "sap/general/application/SAPGeneralApplication";
import AppsList from "sap/general/domain/entities/appsList";
import AppStore from "shared/storage/appStore";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import SystemActions from "systems/infraestructure/storage/systemActions";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class SAPController {
  private appStore: AppStore;
  private SAPGeneralApplication: SAPGeneralApplication;
  private SAPGeneralActions: SAPGeneralActions;
  private systemActions: SystemActions;

  constructor() {
    this.SAPGeneralApplication = new SAPGeneralApplication();
    this.appStore = new AppStore();
    this.SAPGeneralActions = new SAPGeneralActions();
    this.systemActions = new SystemActions();
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
  /**
   * Guarda en el modelo la URL base para conectarse a servicio Odat
   * @param url | Url
   */
  setURLODataCore(url: string): void {
    this.SAPGeneralActions.setURLODataCore(url);
  }
  /**
   * Ejecuta los servicios al seleccionar un sistema
   */
  async executeServicesSystemSelect(): Promise<responseMetadata> {
    // Primero se lee el metadata del core. Si este va bien se continuan con el resto de servicio
    let result = await this.SAPGeneralApplication.callMetaData(
      this.appStore.getState().SAPGeneral.URLODataCore,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password
    );
    if (result.isSuccess) {
      this.systemActions.setConnectedToSystem(true);

      // Se llama al servicio de obtención de usuarios
      this.readUserInfo();

      // Listado de aplicaciones, me espero porque aparte de leer las aplicaciones lanza el metadata
      // de cada una de ellas. Y el metadata se tiene que lanzar antes que los servicios de cada aplicación.
      await this.readAppsList();

      return Result.ok<void>();
    } else {
      return result;
    }
  }
  /**
   * Devuelve los datos del usuario de conexión
   * @returns | Promesa con el resultado del proceso
   */
  async readUserInfo(): Promise<responseGetUserInfoRepo> {
    return this.SAPGeneralApplication.readUserInfo(
      this.appStore.getState().SAPGeneral.URLODataCore,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password
    );
  }
  /**
   * Obtiene la lista de aplicaciones configuradas
   * @returns | Promesa con el resultado del proceso
   */
  async readAppsList(
    language: string = i18n.language
  ): Promise<responseGetAppsList> {
    return this.SAPGeneralApplication.readAppsList(
      this.appStore.getState().SAPGeneral.URLODataCore,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language
    );
  }
  /**
   * Devuelve la lista de aplicaciones del modelo
   * @returns Array con la lista de aplicaciones
   */
  getAppList(): AppsList[] {
    return this.appStore.getState().SAPGeneral.appsList;
  }
  /**
   * Indicador si se tiene que mostrar el listado de aplicaciones
   * @param value | Booleano con la acción
   */
  setShowListApps(value: boolean) {
    this.SAPGeneralActions.setShowListApps(value);
  }
  /**
   * Indicador si se muestra el loader de leyendo aplicaciones
   * @param value
   */
  setLoadingListApps(value: boolean) {
    this.SAPGeneralActions.setLoadingListApps(value);
  }
  /**
   * Devuelve los datos de conexión al sistema
   * @returns Objetos con los datos de conexión al sistema
   */
  getDataForConnection(): DataConnectionSystem {
    return {
      host: this.appStore.getState().SAPTransportOrder.URLOData,
      sap_user: this.appStore.getState().System.systemSelected.sap_user,
      sap_password: this.appStore.getState().System.systemSelected.sap_password,
      client: this.appStore.getState().System.systemSelected.client,
      language: this.appStore.getState().System.systemSelected.language,
    };
  }
}
