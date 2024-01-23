import { FC } from "react";
import { MessageBox, MessageBoxActions, Text } from "@ui5/webcomponents-react";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useDataManager from "sap/transportOrder/infraestructure/frontend/hooks/useDataManager";
import {
	FieldsOrdersTreeTable,
	FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { APP } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";

const ConfirmDeleteOrder: FC = () => {
	const { getI18nText } = useTranslations();
	const { rowOrderCellAction, openConfirmeDelete } = useAppSelector(
		(state) => state.SAPTransportOrder
	);
	const sapTransportOrderController = new SAPTransportOrderController();
	const { showMessage, updateMessage, updateResultError } = useMessages();
	const { deleteOrderModel } = useDataManager();
	const { getDataForConnection } = useSAPGeneral();
	const { setOpenConfirmDeleteAction, setRowOrderCellAction } =
		useSAPTransportOrderStore();

	return (
		<MessageBox
			open={openConfirmeDelete}
			onClose={(event) => {
				if (event.detail.action == "OK") {
					let toastID = showMessage(
						getI18nText("transportOrder.deleteOrders.deleteInProcess", {
							order: rowOrderCellAction?.orderTask,
						}),
						MessageType.info
					);

					sapTransportOrderController
						.deleteOrder(
							getDataForConnection(APP),
							rowOrderCellAction?.orderTask as string
						)
						.then((response) => {
							if (response.isSuccess) {
								// No hay respuesta al ser un DELETE por ello si va todo bien saco un mensaje propio
								updateMessage(
									toastID,
									getI18nText("transportOrder.deleteOrders.deleteCompleted", {
										order: rowOrderCellAction?.orderTask,
									}),
									MessageType.success
								);
								// Borrado de la orden/tarea en el modelo
								deleteOrderModel(
									rowOrderCellAction as
										| FieldsOrdersTreeTable
										| FieldsTaskTreeTable
								);
							} else {
								updateResultError(
									toastID,
									response.getErrorValue() as ErrorGraphql
								);
							}
						});
				}

				setOpenConfirmDeleteAction(false);
				setRowOrderCellAction(null);
			}}
			titleText={getI18nText("transportOrder.deleteOrders.popupConfirm.title", {
				order: rowOrderCellAction?.orderTask,
			})}
			emphasizedAction={MessageBoxActions.Cancel}
		>
			{getI18nText("transportOrder.deleteOrders.popupConfirm.mainText")}
			<br />
			{rowOrderCellAction?.levelTree == "order" && (
				<Text style={{ fontWeight: "bold" }}>
					{" "}
					{getI18nText(
						"transportOrder.deleteOrders.popupConfirm.disclaimerOrder"
					)}
				</Text>
			)}
		</MessageBox>
	);
};

export default ConfirmDeleteOrder;
