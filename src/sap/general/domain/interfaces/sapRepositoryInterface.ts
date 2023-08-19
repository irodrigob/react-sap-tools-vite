import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import { metadataDTO } from "sap/general/infraestructure/dto/metadataDTO";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default interface SAPRepositoryInterface {
  /**
   * Llama al servicio al metadata del core
   * @param dataConnection | Datos conexión sistema
   */
  callMetadataCore(dataConnection: DataConnectionSystem): Promise<metadataDTO>;

  /**
   * Obtiene todo los datos del usuario de conexión
   * @param dataConnection | Datos conexión sistema
   */
  getUserInfo(dataConnection: DataConnectionSystem): Promise<UserInfo>;
  /**
   * Obtiene la lista de aplicaciones configuradas
   * @param dataConnection | Datos conexión sistema
   */
  getAppsList(dataConnection: DataConnectionSystem): Promise<AppsList[]>;
}
