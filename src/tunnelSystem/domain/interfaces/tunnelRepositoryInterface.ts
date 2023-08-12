import Tunnel from "tunnelSystem/domain/entities/tunnel";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import TunnelProvider from "tunnelSystem/domain/entities/provider";

export default interface TunnelRepositoryInterface {
  /**
   * Recupera los sistemas de un usuario
   * @param user | Usuario
   * @returns Promesa con un array de sistemas
   */
  getTunnels(user: string): Promise<Tunnel[]>;
  /**
   * Recupera la configuración para los tuneles
   * @param user | usuario
   * @return Promesa con la configuración del tunel
   */
  getConfiguration(user: string): Promise<TunnelConfiguration>;
  /**
   * Actualización de la configuración para el tunel
   * @param configuration | Configuración a grabar
   * @returns Promesa con el tunel actualizado
   */
  editConfiguration(
    configuration: TunnelConfiguration
  ): Promise<TunnelConfiguration>;
  /**
   * Devuelve los proveedores habilitados para el tunnel
   */
  getTunnelProviders(): Promise<TunnelProvider[]>;
}
