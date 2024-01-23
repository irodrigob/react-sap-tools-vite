import { FC } from "react";
import { FlexBox, Icon, ToolbarSeparator } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons-tnt/dist/parts";
import "@ui5/webcomponents-icons/dist/documents";
import "@ui5/webcomponents-icons/dist/edit";
import "@ui5/webcomponents-icons/dist/shipping-status";
import "@ui5/webcomponents-icons/dist/personnel-view";
import "@ui5/webcomponents-icons/dist/accept";
import "@ui5/webcomponents-icons/dist/decline";
import "@ui5/webcomponents-icons/dist/delete";
import "@ui5/webcomponents-icons-tnt/dist/parts";

import { useTranslations } from "translations/i18nContext";
import {
	FieldsOrdersTreeTable,
	FieldsTaskTreeTable,
} from "sap/transportOrder/infraestructure/types/transport";
import useDataManager from "sap/transportOrder/infraestructure/frontend/hooks/useDataManager";
import useCellActions from "sap/transportOrder/infraestructure/frontend/hooks/useCellActions";
import { useAppSelector } from "shared/storage/useStore";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";

const CellActions: FC = (instance: any) => {
	const { getI18nText } = useTranslations();
	const {
		enableRowEditable,
		initValuesDataEditingRow,
		resetValuesDataEditingRow,
	} = useDataManager();
	const { systemSelected } = useAppSelector((state) => state.System);
	const { editingRow, showOrderObjects } = useAppSelector(
		(state) => state.SAPTransportOrder
	);

	const rowOriginal: FieldsOrdersTreeTable | FieldsTaskTreeTable =
		instance.row.original;

	const {
		changeUserOrder,
		saveEditingRow,
		handlerReleaseOrder,
		handlerOrderObjects,
	} = useCellActions();
	const { setOpenConfirmDeleteAction, setRowOrderCellAction } =
		useSAPTransportOrderStore();

	return (
		<>
			<FlexBox
				justifyContent="SpaceAround"
				style={{ paddingLeft: "-4rem" }}
			>
				{rowOriginal.row_editable && (
					<>
						{!editingRow && (
							<>
								{!showOrderObjects && (
									<Icon
										interactive={true}
										name="edit"
										showTooltip={true}
										accessibleName={getI18nText(
											"transportOrder.tableOrder.actions.editTooltip"
										)}
										onClick={() => {
											enableRowEditable(rowOriginal, true);
											initValuesDataEditingRow(rowOriginal);
										}}
										style={{ marginRight: "0.5rem" }}
									/>
								)}

								<Icon
									interactive={true}
									name="shipping-status"
									showTooltip={true}
									accessibleName={getI18nText(
										"transportOrder.tableOrder.actions.releaseOrder"
									)}
									onClick={handlerReleaseOrder(rowOriginal.orderTask)}
									style={{ marginRight: "0.5rem" }}
								/>
								{rowOriginal.user != systemSelected.sap_user && (
									<Icon
										interactive={true}
										name="personnel-view"
										showTooltip={true}
										accessibleName={getI18nText(
											"transportOrder.tableOrder.actions.editAutoAssign"
										)}
										onClick={() => {
											changeUserOrder(rowOriginal, systemSelected.sap_user);
										}}
										style={{ marginRight: "0.5rem" }}
									/>
								)}
							</>
						)}
					</>
				)}
				{rowOriginal.hasObjects && !editingRow && (
					<Icon
						interactive={true}
						name="tnt/parts"
						showTooltip={true}
						accessibleName={getI18nText(
							"transportOrder.tableOrder.actions.orderObjects"
						)}
						onClick={handlerOrderObjects({
							order: rowOriginal.orderTask,
							description: rowOriginal.description,
							row_editable: rowOriginal.row_editable,
							type: rowOriginal.type,
							user: rowOriginal.user,
							parent_order:
								rowOriginal.levelTree == "task"
									? (rowOriginal as FieldsTaskTreeTable).parent_order
									: "",
						})}
						style={{ marginLeft: "0.1rem" }}
					/>
				)}
				{!editingRow &&
					rowOriginal.row_editable &&
					((rowOriginal.levelTree == "order" && rowOriginal.row_deletable) ||
						rowOriginal.levelTree == "task") && (
						<>
							<ToolbarSeparator
								style={{ height: "1rem", marginLeft: "0.3rem" }}
							/>
							<Icon
								name="delete"
								interactive={true}
								design="Negative"
								style={{ marginLeft: "0.3rem" }}
								showTooltip={true}
								onClick={() => {
									setRowOrderCellAction(rowOriginal);
									setOpenConfirmDeleteAction(true);
								}}
								accessibleName={getI18nText(
									"transportOrder.tableOrder.actions.deleteOrder"
								)}
							/>
						</>
					)}
				{rowOriginal.row_editing && (
					<>
						<Icon
							name="accept"
							interactive={true}
							showTooltip={true}
							accessibleName={getI18nText(
								"transportOrder.tableOrder.actions.confirmTooltip"
							)}
							onClick={() => {
								saveEditingRow();
							}}
						/>
						<Icon
							name="decline"
							interactive={true}
							style={{ marginLeft: "0.5rem" }}
							showTooltip={true}
							accessibleName={getI18nText(
								"transportOrder.tableOrder.actions.cancelTooltip"
							)}
							onClick={() => {
								enableRowEditable(rowOriginal, false);
								resetValuesDataEditingRow();
							}}
						/>
					</>
				)}
			</FlexBox>
		</>
	);
};

export default CellActions;
