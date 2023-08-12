import { GATEWAY_CONF } from "sap/general/infraestructure/utils/constants/constants";

export default class SAPFormatters {
  /**
   * Devuelve la URL completa para la conexión al sistema SAP
   * @param host | Host del sistema
   * @param service | Servicio
   * @returns URL completa del servicio
   */
  static buildSAPUrl2Connect(
    host: string,
    service: string = GATEWAY_CONF.ODATA_SERVICE
  ): string {
    return `${host}${GATEWAY_CONF.ODATA_PATH}${service}`;
  }
}
