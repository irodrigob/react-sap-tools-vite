import { useCallback } from "react";
import useFilterValues from "sap/transportOrder/infraestructure/frontend/components/filtersOrdersTable/useFilterValues";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useTranslations } from "translations/i18nContext";
import {
	FieldsOrdersTreeTable,
	FieldsTaskTreeTable,
	Orders,
	SystemUsers,
} from "sap/transportOrder/infraestructure/types/transport";
import { FormTransportCopy } from "sap/transportOrder/infraestructure/frontend/components/popupTransCopy/transCopy";
import {
	releaseOrdersDTOArray,
	transportCopyDTO,
	userOrdersDTO,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useAppSelector } from "shared/storage/useStore";
import UpdateOrder from "sap/transportOrder/domain/entities/updateOrder";
import useDataManager from "sap/transportOrder/infraestructure/frontend/hooks/useDataManager";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
import useSAPTransportOrderStore from "./useSAPTransportOrderStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { APP } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import useMessageManager from "messageManager/infraestructure/frontend/hooks/useMessageManager";

export default function useTransportOrder() {
	const { getDefaultFilters, convertFilter2paramsGraphql } = useFilterValues();
	const { systemSelected } = useAppSelector((state) => state.System);
	const { orderTaskSelected, toolbarFilters, orderListTree } = useAppSelector(
		(state) => state.SAPTransportOrder
	);
	const { updateDataFromReleaseOrder, postLoadUserOrder } = useDataManager();
	const transportOrderController = new SAPTransportOrderController();
	const { getI18nText } = useTranslations();
	const {
		showResultError,
		showMessage,
		convertServiceSAPMsgType,
		updateMessage,
		updateResultError,
	} = useMessages();
	const { setSystemChangedAction, setApplicationChangedAction } =
		useSAPGeneralStore();
	const { getDataForConnection } = useSAPGeneral();
	const {
		setToolbarFiltersAction,
		setOrderTaskSelectedAction,
		setLoadingOrdersAction,
		setRowsExpandedAction,
		setAutoResetExpandedAction,
		clearVariablesObjects,
		setSystemTransportCopyAction,
		setSystemUsersAction,
		setSystemsTransportCopyAction,
	} = useSAPTransportOrderStore();
	const { addFromSAPArrayReturn } = useMessageManager();

	/*************************************
	 * Funciones
	 ************************************/
	/**
	 * Proceso de lectura de datos de las ordenes del usuario
	 */
	const loadInitialData = useCallback(() => {
		setLoadingOrdersAction(true);
		setSystemChangedAction(false);
		setApplicationChangedAction(false);

		// Obtención de los filtros por defecto
		let filterValues = getDefaultFilters();
		setToolbarFiltersAction(filterValues);

		// Parametros para poder llamar al servicio
		let paramsService = convertFilter2paramsGraphql(filterValues);

		let dataConnection = getDataForConnection(APP);

		// Lista inicial de las ordenes del usuario
		transportOrderController
			.getUserOrdersList(dataConnection, dataConnection.sap_user, paramsService)
			.then((resultGetOrderList) => {
				setLoadingOrdersAction(false);
				if (resultGetOrderList.isSuccess) {
					postLoadUserOrder(resultGetOrderList.getValue() as userOrdersDTO[]);

					// Leemos los sistemas a los que se puede hacer el transport de copia
					transportOrderController
						.getSystemsTransport(getDataForConnection(APP))
						.then((resultSystemsTransport) => {
							if (resultSystemsTransport.isSuccess) {
								setSystemsTransportCopyAction(
									resultSystemsTransport.getValue() as SystemsTransport[]
								);
							} else {
								showResultError(
									resultSystemsTransport.getErrorValue() as ErrorGraphql
								);
							}
						});
				} else {
					showResultError(resultGetOrderList.getErrorValue() as ErrorGraphql);
				}
			});

		// Usuarios del sistema que pueden estar en una orden. Se usará para el contro que permite cambiar el usuario de una orden
		getSystemsUsers();
	}, []);

	/**
	 * Función que realiza la lectura de nuevo de las ordendes del usuario
	 * la diferencia. Esta función solo realiza la llamada al método de GraphQL y no tiene
	 * que hacer nada más ya que los loader o lo que sea ya se gestiona desde fuera de esta llamada.
	 */
	const reloadUserOrders = useCallback(() => {
		setOrderTaskSelectedAction([]);
		setLoadingOrdersAction(true);
		setRowsExpandedAction([]);
		setAutoResetExpandedAction(true); // Fuerzo el reset para que al cargar nuevos datos las filas se vuelvan a resetear
		clearVariablesObjects();
		let dataConnection = getDataForConnection(APP);
		transportOrderController
			.getUserOrdersList(
				dataConnection,
				dataConnection.sap_user,
				convertFilter2paramsGraphql(toolbarFilters)
			)
			.then((response) => {
				setLoadingOrdersAction(false);
				if (response.isSuccess) {
					postLoadUserOrder(response.getValue() as userOrdersDTO[]);
				}
			});
	}, [systemSelected, toolbarFilters]);

	const doTransportCopy = useCallback(
		(data: FormTransportCopy) => {
			let toastID = showMessage(
				getI18nText("transportOrder.transportCopy.popup.msgTransportInProcess"),
				MessageType.info,
				{ autoClose: false, isLoading: true }
			);
			setSystemTransportCopyAction(data.system);

			transportOrderController
				.doTransportCopy(
					getDataForConnection(APP),
					data.system,
					data.description,
					orderTaskSelected.map((row: FieldsOrdersTreeTable) => {
						return { order: row.orderTask };
					})
				)
				.then((response) => {
					if (response.isSuccess) {
						let returnTransport = response.getValue() as transportCopyDTO;

						addFromSAPArrayReturn(returnTransport.return);

						updateMessage(
							toastID,
							returnTransport.return[0].message,
							convertServiceSAPMsgType(returnTransport.return[0].type)
						);
					} else {
						updateResultError(
							toastID,
							response.getErrorValue() as ErrorGraphql
						);
					}
				});
		},
		[orderTaskSelected]
	);

	/**
	 * Actualiza los datos de una orden/tarea
	 * @param orderData | Datos de la orden o tarea
	 */
	const changeDataOrder = useCallback(
		(orderData: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
			return transportOrderController.UpdateOrder(
				getDataForConnection(APP),
				new UpdateOrder(
					orderData.orderTask,
					orderData.description,
					orderData.user
				)
			);
		},
		[]
	);

	/**
	 * Lectura de los usuarios de SAP que pueden estar en una orden/tarea
	 */
	const getSystemsUsers = useCallback(() => {
		transportOrderController
			.getSystemsUsers(getDataForConnection())
			.then((response) => {
				if (response.isSuccess)
					setSystemUsersAction(response.getValue() as SystemUsers);
			});
	}, []);

	/**
	 * Libera las ordenes/tareas pasadas por parámetro
	 * @param orders | Array de ordenes
	 */
	const releaseOrders = useCallback(
		(orders: Orders) => {
			let toastID = showMessage(
				getI18nText("transportOrder.releaseOrders.releaseInProcess"),
				MessageType.info,
				{ autoClose: false, isLoading: true }
			);

			transportOrderController
				.releaseOrders(getDataForConnection(APP), orders)
				.then((response) => {
					if (response.isSuccess) {
						// Como al actualiar la tabla se desmarca las filas seleccionadas y me desajusta la toolbar de acciones. Por ello
						// las desmarco para que se resetee todo bien.
						setOrderTaskSelectedAction([]);

						let returnRelease = response.getValue() as releaseOrdersDTOArray;

						addFromSAPArrayReturn(
							returnRelease.map((row) => {
								return row.return;
							})
						);

						updateDataFromReleaseOrder(returnRelease);

						updateMessage(
							toastID,
							getI18nText("transportOrder.releaseOrders.releaseCompleted"),
							MessageType.success
						);
					} else {
						updateResultError(
							toastID,
							response.getErrorValue() as ErrorGraphql
						);
					}
				});
		},
		[orderListTree]
	);

	return {
		loadInitialData,
		reloadUserOrders,
		doTransportCopy,
		changeDataOrder,
		releaseOrders,
		systemSelected,
		toolbarFilters,
	};
}
