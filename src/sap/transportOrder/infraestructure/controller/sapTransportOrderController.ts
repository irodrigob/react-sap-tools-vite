import SAPTransportOrderApplication from "sap/transportOrder/application/SAPTransportOrderApplication";
import {
  responseUserOrdersList,
  responseSystemsTransport,
  responseUpdateOrder,
  responseSystemsUsers,
  responseGetOrderObjects,
  responseDeleteOrders,
  responseNewOrder,
  responseDeleteOrderObject,
  responseSelectableOrders,
  responseMoveOrderObjects,
} from "sap/transportOrder/infraestructure/types/application";
import AppStore from "shared/storage/appStore";
import {
  FiltersOrdersGraphQL,
  Orders,
  OrderObjectKey,
  OrderObjectsKey,
} from "sap/transportOrder/infraestructure/types/transport";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SAPController from "sap/general/infraestructure/controller/sapController";

export default class SAPTransportOrderController {
  private appStore: AppStore;
  private transportOrderApplication: SAPTransportOrderApplication;
  private sapTransportOrderActions: SAPTransportOrderActions;
  private sapController: SAPController;

  constructor() {
    this.appStore = new AppStore();
    this.transportOrderApplication = new SAPTransportOrderApplication();
    this.sapTransportOrderActions = new SAPTransportOrderActions();
    this.sapController = new SAPController();
  }
  /**
   * Limpia las variables principales del transporte de copia
   */
  clearVariables(): void {
    // Ordenes del usuario
    this.sapTransportOrderActions.setOrderListTree([]);
    this.sapTransportOrderActions.setOrderTaskSelected([]);

    // Sistema seleccionado
    this.sapTransportOrderActions.setSystemsTransportCopy([]);
    this.sapTransportOrderActions.setSystemTransportCopy("");

    // Objetos
    this.clearVariablesObjects();
  }
  clearVariablesObjects(): void {
    this.sapTransportOrderActions.setOrderObjects([]);
    this.sapTransportOrderActions.setOrdersObjectsSelected([]);
    this.sapTransportOrderActions.setShowOrderObjects(false);
    this.sapTransportOrderActions.setSelectedOrder("");
  }
  /**
   * Llama al servicio al metadata del core
   * @param paramsService | Parametros del servicio
   * @returns | Array con la lista de ordenes del usuario
   */
  getUserOrdersList(
    paramsService: FiltersOrdersGraphQL
  ): Promise<responseUserOrdersList> {
    return this.transportOrderApplication.getUserOrdersList(
      this.sapController.getDataForConnection(),
      this.appStore.getState().System.systemSelected.sap_user,
      paramsService
    );
  }
  /**
   * Actualiza si el sistema ha cambiado.
   * @param change Valor si ha cambiado el sistema o no.
   */
  setSystemChanged(change: boolean = true) {
    this.sapTransportOrderActions.setSystemChanged(change);
  }
  /**
   * Lista de sistemas a los cuales se puede transportar
   */
  async getSystemsTransport(): Promise<responseSystemsTransport> {
    return this.transportOrderApplication.getSystemsTransport(
      this.sapController.getDataForConnection()
    );
  }
  /**
   * Realizar transporte de copias
   * @param systemTransport | Sistema a transportar
   * @param description | Descripción de la orden
   * @param orders | Ordenes
   */
  async doTransportCopy(
    systemTransport: string,
    description: string,
    orders: Orders
  ) {
    return this.transportOrderApplication.doTransportCopy(
      this.sapController.getDataForConnection(),
      systemTransport,
      description,
      orders
    );
  }
  /**
   * Actualiza los datos de la orden
   * @param orderData | Datos de la orden
   * @param language | Idioma
   * @returns | Resultado del proceso
   */
  async UpdateOrder(orderData: UpdateOrder): Promise<responseUpdateOrder> {
    return this.transportOrderApplication.updateOrder(
      this.sapController.getDataForConnection(),
      orderData
    );
  }
  /**
   *Lista de usuarios SAP que pueden estar en una orden de transporte
   */
  async getSystemsUsers(): Promise<responseSystemsUsers> {
    return this.transportOrderApplication.getSystemsUsers(
      this.sapController.getDataForConnection()
    );
  }
  /**
   * Libera las ordenes pasadas por parámetro
   * @param orders | Ordenes
   */
  async releaseOrders(orders: Orders) {
    return this.transportOrderApplication.releaseOrders(
      this.sapController.getDataForConnection(),
      orders
    );
  }
  /**
   *  Recupera los objetos de una orden/tarea
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  async getOrderObjects(orders: Orders): Promise<responseGetOrderObjects> {
    return this.transportOrderApplication.getOrderObjects(
      this.sapController.getDataForConnection(),
      orders
    );
  }
  /**
   *  Borra una orden o tarea
   * @param order | Orden
   * @returns | Resultado del transporte de copias
   */
  async deleteOrder(order: string): Promise<responseDeleteOrders> {
    return this.transportOrderApplication.deleteOrder(
      this.sapController.getDataForConnection(),
      order
    );
  }
  /**
   * Crea una orden
   * @param order | Orden
   * @returns | Resultado del transporte de copias
   */
  async newOrder(order: NewOrder): Promise<responseNewOrder> {
    return this.transportOrderApplication.newOrder(
      this.sapController.getDataForConnection(),
      order
    );
  }
  /**
   *  Borra un objeto de una orden o tarea
   * @param objectData | Objeto a borrar
   * @returns | Resultado del transporte de copias
   */
  async deleteOrderObject(
    objectData: OrderObjectKey
  ): Promise<responseDeleteOrderObject> {
    return this.transportOrderApplication.deleteOrderObject(
      this.sapController.getDataForConnection(),
      objectData
    );
  }
  /**
   * Obtiene las ordenes seleccionables para poder trabajar
   * @param orderType | Tipo de orden
   * @returns | Resultado de las ordenes de desarrollo
   */
  async getSelectableOrders(
    orderType: string
  ): Promise<responseSelectableOrders> {
    return this.transportOrderApplication.getSelectableOrders(
      this.sapController.getDataForConnection(),
      orderType
    );
  }
  /**
   *  Mueve los objetos de una orden a otra
   * @param language | Idioma
   * @param orderObjects | Objetos de la orden a mover
   * @param orderTo | Orden destino
   * @returns | Resultado del transporte de copias
   */
  async moveOrderObjects(
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<responseMoveOrderObjects> {
    return this.transportOrderApplication.moveOrderObjects(
      this.sapController.getDataForConnection(),
      orderTo,
      orderObjects
    );
  }
}
