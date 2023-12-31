import { ApolloError } from "@apollo/client";
import { Result } from "shared/core/Result";
import TransportOrderRepository from "sap/transportOrder/infraestructure/repositories/transportOrderRepository";
import {
  FiltersOrdersGraphQL,
  OrderObjects,
  Orders,
  OrderObjectsKey,
} from "sap/transportOrder/infraestructure/types/transport";
import {
  responseUserOrdersList,
  responseSystemsTransport,
  responseDoTransportCopy,
  responseUpdateOrder,
  responseSystemsUsers,
  responseReleaseOrders,
  responseGetOrderObjects,
  responseDeleteOrders,
  responseNewOrder,
  responseDeleteOrderObject,
  responseSelectableOrders,
  responseMoveOrderObjects,
} from "sap/transportOrder/infraestructure/types/application";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import AppStore from "shared/storage/appStore";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import OrderObject from "sap/transportOrder/domain/entities/orderObject";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import ArrayUtils from "shared/utils/array/arrayUtils";
import {
  OrderObjectsDTO,
  OrderObjectDTO,
  userOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import { OrderObjectKey } from "sap/transportOrder/infraestructure/types/transport";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";
import { STATUS } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default class TransportOrderApplication {
  private transportOrderRepository: TransportOrderRepository;
  private appStore: AppStore;
  private sapTransportOrderActions: SAPTransportOrderActions;

  constructor() {
    this.transportOrderRepository = new TransportOrderRepository();
    this.appStore = new AppStore();
    this.sapTransportOrderActions = new SAPTransportOrderActions();
  }

  /**
   * Llama al servicio al metadata del core
   * @param dataConnection | Datos conexión sistema
   * @param user | Usuario SAP
   * @param paramsService | Parametros del servicio
   * @returns | Array con la lista de ordenes del usuario
   */
  async getUserOrdersList(
    dataConnection: DataConnectionSystem,
    user: string,
    paramsService: FiltersOrdersGraphQL
  ): Promise<responseUserOrdersList> {
    try {
      let response = await this.transportOrderRepository.getUserOrdersList(
        dataConnection,
        user,
        paramsService
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }

  /**
   * Lista de sistemas a los cuales se puede transportar
   * @param dataConnection | Datos conexión sistema
   */
  async getSystemsTransport(
    dataConnection: DataConnectionSystem
  ): Promise<responseSystemsTransport> {
    try {
      let response = await this.transportOrderRepository.getSystemsTransport(
        dataConnection
      );

      // Se añade un sistema en blanco al inicio para que el select en pantalla lo procese
      this.addInitialSystemTransport(response);

      // Se guerda el resultado en el modelo y se devuelve
      this.sapTransportOrderActions.setSystemsTransportCopy(response);

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Realiza el transport de copia de las ordenes/tareas pasadas
   * @param dataConnection | Datos conexión sistema
   * @param systemTransport | Sistema a transportar
   * @param description | Descripción de la orden
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  async doTransportCopy(
    dataConnection: DataConnectionSystem,
    systemTransport: string,
    description: string,
    orders: Orders
  ): Promise<responseDoTransportCopy> {
    try {
      let response = await this.transportOrderRepository.doTransportCopy(
        dataConnection,
        systemTransport,
        description,
        orders
      );
      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Añade un registro al principio en blanco y por defecto lo selecciono para que se tenga que selecionar un sistema.
     Lo tengo que hacer porque el componente Select de UI5 no lo hace y parece que tengas un sistema preseleccionado cuando no es así.
   * @param data | Array con los sistema a realizar el transpore de copias
   * @returns | Array con los sistema a realizar el transpore de copias
   */
  addInitialSystemTransport(data: SystemsTransport[]): SystemsTransport[] {
    //
    let values = [...data];
    values.unshift({ systemName: "", systemDesc: "" });
    return values;
  }
  /**
   * Elimina el sistema inicial dummy que se añade al leer los datos
   * que se usará para el desplegable
   */
  eliminateInitialSystem() {
    if (
      this.appStore.getState().SAPTransportOrder.systemsTransportCopy[0]
        .systemName == ""
    ) {
      let values = [
        ...this.appStore.getState().SAPTransportOrder.systemsTransportCopy,
      ];
      values.shift();
      this.sapTransportOrderActions.setSystemsTransportCopy(values);
    }
  }
  /**
   * Actualiza los datos de una orden
   * @param dataConnection | Datos conexión sistema
   * @param orderData | Datos de la orden
   * @returns | Resultado del proceso
   */
  async updateOrder(
    dataConnection: DataConnectionSystem,
    orderData: UpdateOrder
  ): Promise<responseUpdateOrder> {
    try {
      await this.transportOrderRepository.updateOrder(
        dataConnection,
        orderData
      );
      // Como es un PUT la actualización SAP no devuelve datos por ello devuelvo un undefinied, porque el void no me deja.
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Lista de usuarios SAP que pueden estar en una orden de transporte
   * @param dataConnection | Datos conexión sistema
   */
  async getSystemsUsers(
    dataConnection: DataConnectionSystem
  ): Promise<responseSystemsUsers> {
    try {
      let response = await this.transportOrderRepository.getSystemsUsers(
        dataConnection
      );
      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Libera las ordenes pasadas por parámetro
   * @param dataConnection | Datos conexión sistema
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  async releaseOrders(
    dataConnection: DataConnectionSystem,
    orders: Orders
  ): Promise<responseReleaseOrders> {
    try {
      let response = await this.transportOrderRepository.releaseOrders(
        dataConnection,
        orders
      );
      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Devuelve los objetos de un ordenes/tareas
   * @param dataConnection | Datos conexión sistema
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  async getOrderObjects(
    dataConnection: DataConnectionSystem,
    orders: Orders
  ): Promise<responseGetOrderObjects> {
    try {
      let response = await this.transportOrderRepository.getOrderObjects(
        dataConnection,
        orders
      );

      return Result.ok(this.convertOrderObjectsDTO2Model(response));
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Borra las ordenes o tareas
   * @param dataConnection | Datos conexión sistema
   * @param orders | Ordenes
   * @returns | Objetos de las ordenes
   */
  async deleteOrder(
    dataConnection: DataConnectionSystem,
    order: string
  ): Promise<responseDeleteOrders> {
    try {
      await this.transportOrderRepository.deleteOrder(dataConnection, order);
      // Como es un DELETE la actualización SAP no devuelve datos por ello devuelvo un undefinied, porque el void no me deja.
      return Result.ok(undefined);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Crea una nueva orden
   * @param dataConnection | Datos conexión sistema
   * @param order | Objeto con la orden
   * @returns | Datos de la orden y tarea(en caso de crearse) creados
   */
  async newOrder(
    dataConnection: DataConnectionSystem,
    order: NewOrder
  ): Promise<responseNewOrder> {
    try {
      let response = await this.transportOrderRepository.newOrder(
        dataConnection,
        order
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Convierte los objetos que vienen del servicio al modelo de la aplicación
   * @param objectsDTO | Objetos del servicio
   * @returns Objetos del modelo
   */
  convertOrderObjectsDTO2Model(objectsDTO: OrderObjectsDTO): OrderObjects {
    let orderGrouped = ArrayUtils.groupBy<OrderObjectDTO>(
      objectsDTO,
      (e) => e.order
    );
    let ordersObjects: OrderObjects = [];
    for (const order in orderGrouped) {
      let orderObject: OrderObject = {
        order: orderGrouped[order][0].order,
        objects: [],
      };

      orderGrouped[order].forEach((object: OrderObjectDTO) => {
        orderObject.objects.push({
          pgmid: object.pgmid,
          object: object.object,
          objectDesc: object.objectDesc,
          objName: object.objName,
          lockflag: object.lockflag,
          objfunc: object.objfunc,
          gennum: object.gennum,
          lang: object.lang,
          activity: object.activity,
        });
      });
      ordersObjects.push(orderObject);
    }
    return ordersObjects;
  }
  /**
   * Borra un objeto de la orden
   * @param dataConnection | Datos conexión sistema
   * @param objectData | Objeto de la orden
   * @returns | Objetos de las ordenes
   */
  async deleteOrderObject(
    dataConnection: DataConnectionSystem,
    objectData: OrderObjectKey
  ): Promise<responseDeleteOrderObject> {
    try {
      let response = await this.transportOrderRepository.deleteOrderObject(
        dataConnection,
        objectData
      );
      // Como es un DELETE la actualización SAP no devuelve datos por ello devuelvo un undefinied, porque el void no me deja.
      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Obtiene las ordenes seleccionables. Es decir, la que se pueden usar para desarrollar.
   * Se llama al repositorio de obtener las ordenes pero pasandole las modificables
   * y el tipo de orden pasado por parámetro
   *@param dataConnection | Datos conexión sistema
   * @param user | Usuario SAP
   * @param paramsService | Parametros del servicio
   * @returns | Array con la lista de ordenes del usuario
   */
  async getSelectableOrders(
    dataConnection: DataConnectionSystem,
    orderType: string
  ): Promise<responseSelectableOrders> {
    // el completeProjects a false es para que SAP no me incluya todas las tareas de la orden. Esto hace que incluya las liberadas
    // aunque le pase por parámetro que no las quiero ver.
    let paramServices: FiltersOrdersGraphQL = {
      orderTypes: [{ type: orderType }],
      orderStatus: [{ status: STATUS.CHANGEABLE }],
      completeProjects: false,
    };

    try {
      let response = await this.transportOrderRepository.getUserOrdersList(
        dataConnection,
        dataConnection.sap_user,
        paramServices
      );

      let orders: SelectableOrders = response.map((row: userOrdersDTO) => {
        return {
          order: row.order,
          orderDesc: row.orderDesc,
          orderType: row.orderType,
          orderTypeDesc: row.orderTypeDesc,
          orderUser: row.orderUser,
          task: row.task,
          taskDesc: row.taskDesc,
          taskType: row.taskType,
          taskTypeDesc: row.taskTypeDesc,
          taskUser: row.taskUser,
        };
      });

      return Result.ok(orders);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
  /**
   * Mueve los objetos de una orden a otra
   * @param dataConnection | Datos conexión sistema
   * @param orderObjects | orden y objetos a mover
   * @param orderTo | Orden destino
   * @returns | Resultado del proceso
   */
  async moveOrderObjects(
    dataConnection: DataConnectionSystem,
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<responseMoveOrderObjects> {
    try {
      let response = await this.transportOrderRepository.moveOrderObjects(
        dataConnection,
        orderTo,
        orderObjects
      );

      return Result.ok(response);
    } catch (error) {
      return Result.fail<ErrorGraphql>(
        ErrorGraphql.create(error as ApolloError)
      );
    }
  }
}
