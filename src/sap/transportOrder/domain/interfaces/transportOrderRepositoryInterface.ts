import {
  OrderObjectsDTO,
  releaseOrdersDTOArray,
  userOrdersDTO,
  transportCopyDTO,
  DeleteOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import {
  FiltersOrdersGraphQL,
  OrderObjectsKey,
  Orders,
  SystemUsers,
  OrderObjectKey,
} from "sap/transportOrder/infraestructure/types/transport";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import { ReturnsDTO } from "shared/dto/generalDTO";
import { DataConnectionSystem } from "systems/infraestructure/types/system";

export default interface TransportOrderRepositoryInterface {
  /**
   * Llama al servicio al metadata del core
   * @param dataConnection | Datos conexión sistema
   * @param user | Usuario obtener las ordenes
   * @returns | Array con la lista de ordenes del usuario
   */
  getUserOrdersList(
    dataConnection: DataConnectionSystem,
    user: string,
    paramsService: FiltersOrdersGraphQL
  ): Promise<userOrdersDTO[]>;
  /**
   * Lista de sistemas a los cuales se puede transportar
   * @param dataConnection | Datos conexión sistema
   * @returns | Array con los sistemas a transportar
   */
  getSystemsTransport(
    dataConnection: DataConnectionSystem
  ): Promise<SystemsTransport[]>;
  /**
   * Realiza el transport de copia de las ordenes/tareas pasadas
   * @param dataConnection | Datos conexión sistema
   * @param systemTransport | Sistema a transportar
   * @param description | Descripción de la orden
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  doTransportCopy(
    dataConnection: DataConnectionSystem,
    systemTransport: string,
    description: string,
    orders: Orders
  ): Promise<transportCopyDTO>;
  /**
   * Actualiza los datos de una orden
   * @param dataConnection | Datos conexión sistema
   * @param orderData | Datos de la orden a actualizar
   * @returns | Resultado del transporte de copias
   */
  updateOrder(
    dataConnection: DataConnectionSystem,
    orderData: UpdateOrder
  ): Promise<void>;
  /**
   * Lista de usuarios SAP que pueden estar en una orden de transporte
   * @param dataConnection | Datos conexión sistema
   * @returns | Array con los usuarios
   */
  getSystemsUsers(dataConnection: DataConnectionSystem): Promise<SystemUsers>;
  /**
   * Libera las ordenes pasadas por parámetro
   * @param dataConnection | Datos conexión sistema
   * @param orders | Ordenes
   * @returns | Resultado de la liberación de ordenes/tareas
   */
  releaseOrders(
    dataConnection: DataConnectionSystem,
    orders: Orders
  ): Promise<releaseOrdersDTOArray>;
  /**
   * Recupera los objetos de una orden/tarea
   * @param dataConnection | Datos conexión sistema
   * @param orders | Ordenes
   * @returns | Objetos de las ordenes
   */
  getOrderObjects(
    dataConnection: DataConnectionSystem,
    orders: Orders
  ): Promise<OrderObjectsDTO>;
  /**
   * Borra las ordenes o tareas
   * @param dataConnection | Datos conexión sistema
   * @param order | Orden
   * @returns | Promesa con el resultado del borrado
   */
  deleteOrder(
    dataConnection: DataConnectionSystem,
    order: string
  ): Promise<DeleteOrdersDTO>;
  /**
   * Crea una nueva orden
   * @param dataConnection | Datos conexión sistema
   * @param order | Objeto con la orden
   * @returns | Datos de la orden y tarea(en caso de crearse) creados
   */
  newOrder(
    dataConnection: DataConnectionSystem,
    order: NewOrder
  ): Promise<userOrdersDTO>;
  /**
   * Borra un objeto de la orden
   * @param dataConnection | Datos conexión sistema
   * @param objectData | Datos con el objeto de la orden
   * @returns | Resultado del borrado del proceso
   */
  deleteOrderObject(
    dataConnection: DataConnectionSystem,
    objectData: OrderObjectKey
  ): Promise<OrderObjectKey>;
  /**
   * Mueve los objetos de una orden a otra
   * @param dataConnection | Datos conexión sistema
   * @param orderObjects | orden y objetos a mover
   * @param orderTo | Orden destino
   * @returns | Resultado del proceso
   */
  moveOrderObjects(
    dataConnection: DataConnectionSystem,
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<ReturnsDTO>;
}
