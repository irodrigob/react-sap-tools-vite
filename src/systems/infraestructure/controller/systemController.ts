import SystemApplication from "systems/application/SystemApplication";
import type {
  responseSystemRepoArray,
  responseNewSystemRepo,
  responseSystemRepo,
  responseBuildURLConnect,
} from "systems/infraestructure/types/application";
import SystemApplicationValidations from "systems/domain/validations/SystemApplicationValidations";
import System from "systems/domain/entities/system";
import { Result } from "shared/core/Result";
import type { newSystemDTO } from "systems/infraestructure/dto/systemDTO";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import AppStore from "shared/storage/appStore";
import SystemActions from "systems/infraestructure/storage/systemActions";

export default class SystemController {
  protected systemApplication: SystemApplication;
  protected systemValidations: SystemApplicationValidations;
  protected tunnelController: TunnelController;
  protected appStore: AppStore;
  private systemActions: SystemActions;

  constructor() {
    this.systemApplication = new SystemApplication();
    this.systemValidations = new SystemApplicationValidations();
    this.tunnelController = new TunnelController();
    this.appStore = new AppStore();
    this.systemActions = new SystemActions();
  }
  /**
   * Obtención de los usuarios de los sistemas
   * @param user | Usuario
   * @returns Array de sistemas
   */
  getUserSystems(user: String): Promise<responseSystemRepoArray> {
    return this.systemApplication.getUserSystems(user);
  }
  /**
   * Validación que el host este formateado.
   * @param host | Host
   * @returns Si es valido, o no.
   */
  validateHost(host: string): boolean {
    return this.systemValidations.validateHost(host);
  }
  /**
   * Grabación de nuevo sistema
   * @param newSystem | Nuevo sistema
   * @returns Promisa con el resultado del proceso
   */
  createNewSystem(newSystem: newSystemDTO): Promise<responseNewSystemRepo> {
    return this.systemApplication.createNewSystem(newSystem);
  }
  /**
   * Actualiza un sistema
   * @param system | Sistema a actualizar
   * @returns  Promesa con el resultado o error del sistema actualizado
   */
  async updateSystem(system: System): Promise<responseSystemRepo> {
    return this.systemApplication.updateSystem(system);
  }
  /**
   * Borra un sistema
   * @param IDsystem | ID de sistema a eliminar
   * @returns  Promesa con el resultado o error del sistema borrado
   */
  async deleteSystem(IDsystem: string): Promise<responseSystemRepo> {
    return this.systemApplication.deleteSystem(IDsystem);
  }
  /**
   * Devuelve la URL para conectarse a un sistema SAP
   * @param systemHost
   * @returns | URL para conectarse al sistema
   */
  async determineURL2ConnectSystem(
    system: System,
    tunnelConfiguration: TunnelConfiguration
  ): Promise<responseBuildURLConnect> {
    if (tunnelConfiguration.apiToken == "" || !system.use_connection_tunnel)
      return Result.ok<string>(system.host);
    else {
      let resultTunnel = await this.tunnelController.getTunnelURLFromHost(
        system.host,
        tunnelConfiguration.apiToken
      );
      if (resultTunnel.isSuccess) {
        return Result.ok<string>(resultTunnel.getValue() as string);
      } else {
        return resultTunnel;
      }
    }
  }
  /**
   * Devuelve la URL base de conexión
   * @returns URL conexión
   */
  getURL2ConnectSystem(): string {
    return this.appStore.getState().System.URL2ConnectSystem;
  }
  /**
   * Devuelve el sistema seleccionado
   * @returns | Sistema seleccionado
   */
  getSystemSelected(): System {
    return this.appStore.getState().System.systemSelected;
  }
  /**
   * Indica si se ha conectado a un sistema
   * @param value | Verdadero o falso
   */
  setConnectedToSystem(value: boolean) {
    this.systemActions.setConnectedToSystem(value);
  }
}
