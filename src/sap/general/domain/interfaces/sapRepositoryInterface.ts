import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import { metadataDTO } from "sap/general/infraestructure/dto/metadataDTO";

export default interface SAPRepositoryInterface {
  /**
   * Llama al servicio al metadata del core
   * @param sapUser | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   */
  callMetadataCore(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<metadataDTO>;

  /**
   * Obtiene todo los datos del usuario de conexión
   * @param sapUser | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   */
  getUserInfo(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<UserInfo>;
  /**
   * Obtiene la lista de aplicaciones configuradas
   * @param sapUser | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   */
  getAppsList(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string
  ): Promise<AppsList[]>;
}
