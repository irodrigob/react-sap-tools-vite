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
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import NewOrder from "sap/transportOrder/domain/entities/newOrder";
import { DataConnectionSystem } from "systems/infraestructure/types/system";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { APP } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";

export default class SAPTransportOrderController {
	private appStore: AppStore;
	private transportOrderApplication: TransportOrderApplication;
	private sapTransportOrderActions: SAPTransportOrderActions;
	private sapController: SAPController;

	constructor() {
		this.appStore = new AppStore();
		this.transportOrderApplication = new TransportOrderApplication();
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
	 * @param orders | Ordenes
	 */
	async releaseOrders(orders: Orders) {
		return this.transportOrderApplication.releaseOrders(
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
			this.getDataForConnection(),
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
