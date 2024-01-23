import TransportOrderApplication from "sap/transportOrder/application/transportOrderApplication";
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
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { APP } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";

export default class SAPTransportOrderController {
	private transportOrderApplication: TransportOrderApplication;
	private sapController: SAPController;

	constructor() {
		this.transportOrderApplication = new TransportOrderApplication();
		this.sapController = new SAPController();
	}
	/**
	 * Llama al servicio al metadata del core
	 * @param dataConnection | Datos conexión
	 * @param user | Usuario
	 * @param paramsService | Parametros del servicio
	 * @returns | Array con la lista de ordenes del usuario
	 */
	getUserOrdersList(
		dataConnection: DataConnectionSystem,
		user: string,
		paramsService: FiltersOrdersGraphQL
	): Promise<responseUserOrdersList> {
		return this.transportOrderApplication.getUserOrdersList(
			dataConnection,
			user,
			paramsService
		);
	}

	/**
	 * Lista de sistemas a los cuales se puede transportar
	 */
	async getSystemsTransport(
		dataConnection: DataConnectionSystem
	): Promise<responseSystemsTransport> {
		return this.transportOrderApplication.getSystemsTransport(dataConnection);
	}
	/**
	 * Realizar transporte de copias
	 * @param dataConnection | Datos conexion
	 * @param systemTransport | Sistema a transportar
	 * @param description | Descripción de la orden
	 * @param orders | Ordenes
	 */
	async doTransportCopy(
		dataConnection: DataConnectionSystem,
		systemTransport: string,
		description: string,
		orders: Orders
	) {
		return this.transportOrderApplication.doTransportCopy(
			dataConnection,
			systemTransport,
			description,
			orders
		);
	}
	/**
	 * Actualiza los datos de la orden
	 * @param dataConnection | Datos conexion
	 * @param orderData | Datos de la orden
	 * @param language | Idioma
	 * @returns | Resultado del proceso
	 */
	async UpdateOrder(
		dataConnection: DataConnectionSystem,
		orderData: UpdateOrder
	): Promise<responseUpdateOrder> {
		return this.transportOrderApplication.updateOrder(
			dataConnection,
			orderData
		);
	}
	/**
	 *Lista de usuarios SAP que pueden estar en una orden de transporte
	 */
	async getSystemsUsers(
		dataConnection: DataConnectionSystem
	): Promise<responseSystemsUsers> {
		return this.transportOrderApplication.getSystemsUsers(dataConnection);
	}
	/**
	 * Libera las ordenes pasadas por parámetro
	 * @param dataConnection | Datos conexion
	 * @param orders | Ordenes
	 */
	async releaseOrders(dataConnection: DataConnectionSystem, orders: Orders) {
		return this.transportOrderApplication.releaseOrders(dataConnection, orders);
	}
	/**
	 *  Recupera los objetos de una orden/tarea
	 * @param dataConnection | Datos conexion
	 * @param orders | Ordenes
	 * @returns | Resultado del transporte de copias
	 */
	async getOrderObjects(
		dataConnection: DataConnectionSystem,
		orders: Orders
	): Promise<responseGetOrderObjects> {
		return this.transportOrderApplication.getOrderObjects(
			dataConnection,
			orders
		);
	}
	/**
	 * Borra una orden o tarea
	 * @param dataConnection | Datos conexion
	 * @param order | Orden
	 * @returns | Resultado del transporte de copias
	 */
	async deleteOrder(
		dataConnection: DataConnectionSystem,
		order: string
	): Promise<responseDeleteOrders> {
		return this.transportOrderApplication.deleteOrder(dataConnection, order);
	}
	/**
	 * Crea una orden
	 * @param dataConnection | Datos conexion
	 * @param order | Orden
	 * @returns | Resultado del transporte de copias
	 */
	async newOrder(
		dataConnection: DataConnectionSystem,
		order: NewOrder
	): Promise<responseNewOrder> {
		return this.transportOrderApplication.newOrder(dataConnection, order);
	}
	/**
	 * Borra un objeto de una orden o tarea
	 * @param dataConnection | Datos conexion
	 * @param objectData | Objeto a borrar
	 * @returns | Resultado del transporte de copias
	 */
	async deleteOrderObject(
		dataConnection: DataConnectionSystem,
		objectData: OrderObjectKey
	): Promise<responseDeleteOrderObject> {
		return this.transportOrderApplication.deleteOrderObject(
			dataConnection,
			objectData
		);
	}
	/**
	 * Obtiene las ordenes seleccionables para poder trabajar
	 * @param dataConnection | Datos conexion
	 * @param orderType | Tipo de orden
	 * @returns | Resultado de las ordenes de desarrollo
	 */
	async getSelectableOrders(
		dataConnection: DataConnectionSystem,
		orderType: string
	): Promise<responseSelectableOrders> {
		return this.transportOrderApplication.getSelectableOrders(
			dataConnection,
			orderType
		);
	}
	/**
	 *  Mueve los objetos de una orden a otra
	 * @param dataConnection | Datos conexion
	 * @param language | Idioma
	 * @param orderObjects | Objetos de la orden a mover
	 * @param orderTo | Orden destino
	 * @returns | Resultado del transporte de copias
	 */
	async moveOrderObjects(
		dataConnection: DataConnectionSystem,
		orderTo: string,
		orderObjects: OrderObjectsKey
	): Promise<responseMoveOrderObjects> {
		return this.transportOrderApplication.moveOrderObjects(
			dataConnection,
			orderTo,
			orderObjects
		);
	}
	/**
	 * Devuelve los datos de conexión al sistema
	 * @returns Objetos con los datos de conexión al sistema
	 */
	getDataForConnection(): DataConnectionSystem {
		return {
			...this.sapController.getDataForConnection(APP),
		};
	}
}
