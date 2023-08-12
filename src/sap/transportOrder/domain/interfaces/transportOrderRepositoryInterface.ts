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

export default interface TransportOrderRepositoryInterface {
  /**
   * Llama al servicio al metadata del core
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param user | Usuario SAP
   * @returns | Array con la lista de ordenes del usuario
   */
  getUserOrdersList(
    system: string,
    sapUser: string,
    sapPassword: string,
    user: string,
    paramsService: FiltersOrdersGraphQL
  ): Promise<userOrdersDTO[]>;
  /**
   * Lista de sistemas a los cuales se puede transportar
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @returns | Array con los sistemas a transportar
   */
  getSystemsTransport(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string
  ): Promise<SystemsTransport[]>;
  /**
   * Realiza el transport de copia de las ordenes/tareas pasadas
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param systemTransport | Sistema a transportar
   * @param description | Descripción de la orden
   * @param orders | Ordenes
   * @returns | Resultado del transporte de copias
   */
  doTransportCopy(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    systemTransport: string,
    description: string,
    orders: Orders
  ): Promise<transportCopyDTO>;
  /**
   * Actualiza los datos de una orden
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param orderData | Datos de la orden a actualizar
   * @returns | Resultado del transporte de copias
   */
  updateOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orderData: UpdateOrder
  ): Promise<void>;
  /**
   * Lista de usuarios SAP que pueden estar en una orden de transporte
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @returns | Array con los usuarios
   */
  getSystemsUsers(
    system: string,
    sapUser: string,
    sapPassword: string
  ): Promise<SystemUsers>;
  /**
   * Libera las ordenes pasadas por parámetro
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param orders | Ordenes
   * @returns | Resultado de la liberación de ordenes/tareas
   */
  releaseOrders(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orders: Orders
  ): Promise<releaseOrdersDTOArray>;
  /**
   * Recupera los objetos de una orden/tarea
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param orders | Ordenes
   * @returns | Objetos de las ordenes
   */
  getOrderObjects(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orders: Orders
  ): Promise<OrderObjectsDTO>;
  /**
   * Borra las ordenes o tareas
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param order | Orden
   * @returns | Promesa con el resultado del borrado
   */
  deleteOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    order: string
  ): Promise<DeleteOrdersDTO>;
  /**
   * Crea una nueva orden
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param order | Objeto con la orden
   * @returns | Datos de la orden y tarea(en caso de crearse) creados
   */
  newOrder(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    order: NewOrder
  ): Promise<userOrdersDTO>;
  /**
   * Borra un objeto de la orden
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param objectData | Datos con el objeto de la orden
   * @returns | Resultado del borrado del proceso
   */
  deleteOrderObject(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    objectData: OrderObjectKey
  ): Promise<OrderObjectKey>;
  /**
   * Mueve los objetos de una orden a otra
   * @param system | Sistema
   * @param sapUser | Usuario SAP
   * @param sapPassword | Password SAP
   * @param language | Idioma
   * @param orderObjects | orden y objetos a mover
   * @param orderTo | Orden destino
   * @returns | Resultado del proceso
   */
  moveOrderObjects(
    system: string,
    sapUser: string,
    sapPassword: string,
    language: string,
    orderTo: string,
    orderObjects: OrderObjectsKey
  ): Promise<ReturnsDTO>;
}
