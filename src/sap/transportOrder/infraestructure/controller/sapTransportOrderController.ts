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

export default class SAPTransportOrderController {
  private appStore: AppStore;
  private transportOrderApplication: SAPTransportOrderApplication;
  private sapTransportOrderActions: SAPTransportOrderActions;

  constructor() {
    this.appStore = new AppStore();
    this.transportOrderApplication = new SAPTransportOrderApplication();
    this.sapTransportOrderActions = new SAPTransportOrderActions();
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
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
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
   * @param language | Idioma
   */
  async getSystemsTransport(
    language: string
  ): Promise<responseSystemsTransport> {
    return this.transportOrderApplication.getSystemsTransport(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language
    );
  }
  /**
   * Realizar transporte de copias
   * @param language | Idioma
   * @param systemTransport | Sistema a transportar
   * @param description | Descripción de la orden
   * @param orders | Ordenes
   */
  async doTransportCopy(
    systemTransport: string,
    description: string,
    orders: Orders,
    language: string
  ) {
    return this.transportOrderApplication.doTransportCopy(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
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
  async UpdateOrder(
    orderData: UpdateOrder,
    language: string
  ): Promise<responseUpdateOrder> {
    return this.transportOrderApplication.updateOrder(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      orderData
    );
  }
  /**
   *Lista de usuarios SAP que pueden estar en una orden de transporte
   */
  async getSystemsUsers(): Promise<responseSystemsUsers> {
    return this.transportOrderApplication.getSystemsUsers(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password
    );
  }
  /**
   * Libera las ordenes pasadas por parámetro
   * @param language | Idioma
   * @param orders | Ordenes
   */
  async releaseOrders(orders: Orders, language: string) {
    return this.transportOrderApplication.releaseOrders(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      orders
    );
  }
  /**
   *  Recupera los objetos de una orden/tarea
   * @param language | Idioma
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  async getOrderObjects(
    language: string,
    orders: Orders
  ): Promise<responseGetOrderObjects> {
    return this.transportOrderApplication.getOrderObjects(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      orders
    );
  }
  /**
   *  Borra una orden o tarea
   * @param language | Idioma
   * @param order | Orden
   * @returns | Resultado del transporte de copias
   */
  async deleteOrder(
    language: string,
    order: string
  ): Promise<responseDeleteOrders> {
    return this.transportOrderApplication.deleteOrder(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      order
    );
  }
  /**
   * Crea una orden
   * @param language | Idioma
   * @param order | Orden
   * @returns | Resultado del transporte de copias
   */
  async newOrder(language: string, order: NewOrder): Promise<responseNewOrder> {
    return this.transportOrderApplication.newOrder(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      order
    );
  }
  /**
   *  Borra un objeto de una orden o tarea
   * @param language | Idioma
   * @param objectData | Objeto a borrar
   * @returns | Resultado del transporte de copias
   */
  async deleteOrderObject(
    language: string,
    objectData: OrderObjectKey
  ): Promise<responseDeleteOrderObject> {
    return this.transportOrderApplication.deleteOrderObject(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
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
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      this.appStore.getState().System.systemSelected.sap_user,
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
    language: string,
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<responseMoveOrderObjects> {
    return this.transportOrderApplication.moveOrderObjects(
      this.appStore.getState().SAPTransportOrder.URLOData,
      this.appStore.getState().System.systemSelected.sap_user,
      this.appStore.getState().System.systemSelected.sap_password,
      language,
      orderTo,
      orderObjects
    );
  }
}
