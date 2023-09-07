import { useCallback } from "react";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import SAPTransportOrderActions from "sap/transportOrder/infraestructure/storage/sapTransportOrderActions";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import {
	SelectableOrder,
	SelectableOrders,
} from "sap/transportOrder/domain/entities/selectableOrders";
import { OrdersData } from "sap/transportOrder/infraestructure/types/selectOrder";
import ArrayUtils from "shared/utils/array/arrayUtils";

export default function useSelectOrder() {
	const transportOrderController = new SAPTransportOrderController();
	const transportOrderActions = new SAPTransportOrderActions();
	const { showResultError } = useMessages();

	const getOrders = useCallback((orderType: string) => {
		transportOrderActions.setLoadingSelectableOrders(true);
		transportOrderController.getSelectableOrders(orderType).then((response) => {
			if (response.isSuccess) {
				transportOrderActions.setLoadingSelectableOrders(false);
				transportOrderActions.setSelectableOrders(
					response.getValue() as SelectableOrders
				);
			} else {
				showResultError(response.getErrorValue() as ErrorGraphql);
			}
		});
	}, []);

	const convertOrders2ListFormat = useCallback(
		(
			selectableOrders: SelectableOrders,
			showTask: boolean = true
		): OrdersData => {
			let ordersGroup = ArrayUtils.groupBy<SelectableOrder>(
				selectableOrders,
				(e) => e.order
			);
			let orders: OrdersData = [];

			for (const order in ordersGroup) {
				orders.push({
					order: ordersGroup[order][0].order,
					orderDesc: ordersGroup[order][0].orderDesc,
					isTask: false,
				});
				if (showTask)
					ordersGroup[order]
						.filter((taskRow) => taskRow.task != "")
						.map((taskRow) => {
							orders.push({
								order: taskRow.task,
								orderDesc: taskRow.taskDesc,
								isTask: true,
							});
						});
			}
			return orders;
		},
		[]
	);

	return { getOrders, convertOrders2ListFormat };
}
