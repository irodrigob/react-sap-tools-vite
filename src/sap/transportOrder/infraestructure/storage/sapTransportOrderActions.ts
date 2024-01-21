import AppStore from "shared/storage/appStore";
import {
	setToolbarFilters,
	setToolbarFiltersState,
	setLoadingOrders,
	setOrderListTree,
	setSystemsTransportCopy,
	setSystemTransportCopy,
	setDescriptionTransportCopy,
	setOrderTaskSelected,
	updateOrderTaskComponent,
	setRowsExpanded,
	setAutoResetExpanded,
	setEditingRow,
	setRowDataForUpdate,
	setSystemUsers,
	setOpenConfirmeDelete,
	setRowOrderCell,
	setTextSearchOrders,
	setShowOrderObjects,
	setOrderObjects,
	setOrdersObjectsSelected,
	setOpenConfirmDeleteOrderObject,
	setObjectsSelected,
	setObjectsToProcess,
	setLoadingSelectableOrders,
	setSelectableOrders,
	setSelectedOrder,
} from "./sapTransportOrderSlice";
import {
	ToolbarFilters,
	ToolbarFiltersState,
	FieldsOrdersTreeTable,
	RowsExpanded,
	EditableRowsField,
	SystemUsers,
	FieldsTaskTreeTable,
	OrderObjects,
	OrderObjectsSelected,
	OrderObjectsKey,
} from "sap/transportOrder/infraestructure/types/transport";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import { initialrowDataForUpdate } from "./initialValues";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";

export default class SAPTransportOrderActions extends AppStore {
	setToolbarFilters(value: ToolbarFilters) {
		this.dispatch(setToolbarFilters(value));
	}
	setToolbarFiltersState(value: ToolbarFiltersState) {
		this.dispatch(setToolbarFiltersState(value));
	}
	setLoadingOrders(value: boolean) {
		this.dispatch(setLoadingOrders(value));
	}
	setOrderListTree(value: FieldsOrdersTreeTable[]) {
		this.dispatch(setOrderListTree(value));
	}
	setSystemsTransportCopy(value: SystemsTransport[]) {
		this.dispatch(setSystemsTransportCopy(value));
	}
	setSystemTransportCopy(value: string) {
		this.dispatch(setSystemTransportCopy(value));
	}
	setDescriptionTransportCopy(value: string) {
		this.dispatch(setDescriptionTransportCopy(value));
	}
	setOrderTaskSelected(value: FieldsOrdersTreeTable[]) {
		this.dispatch(setOrderTaskSelected(value));
	}
	updateOrderTaskComponent(value: FieldsOrdersTreeTable) {
		this.dispatch(updateOrderTaskComponent(value));
	}
	setRowsExpanded(value: RowsExpanded) {
		this.dispatch(setRowsExpanded(value));
	}
	setAutoResetExpanded(value: boolean) {
		this.dispatch(setAutoResetExpanded(value));
	}
	setEditingRow(value: boolean) {
		this.dispatch(setEditingRow(value));
	}
	setRowDataForUpdate(value: EditableRowsField) {
		this.dispatch(setRowDataForUpdate(value));
	}
	resetRowDataForUpdate() {
		this.dispatch(setRowDataForUpdate(initialrowDataForUpdate));
	}
	setSystemUsers(users: SystemUsers) {
		this.dispatch(setSystemUsers(users));
	}
	setOpenConfirmDelete(value: boolean) {
		this.dispatch(setOpenConfirmeDelete(value));
	}
	setRowOrderCellAction(
		row: FieldsOrdersTreeTable | FieldsTaskTreeTable | null
	) {
		this.dispatch(setRowOrderCell(row));
	}
	setTextSearchOrders(value: string) {
		this.dispatch(setTextSearchOrders(value));
	}
	setShowOrderObjects(value: boolean) {
		this.dispatch(setShowOrderObjects(value));
	}
	setOrderObjects(value: OrderObjects) {
		this.dispatch(setOrderObjects(value));
	}
	setOrdersObjectsSelected(value: OrderObjectsSelected) {
		this.dispatch(setOrdersObjectsSelected(value));
	}
	setOpenConfirmDeleteOrderObject(value: boolean) {
		this.dispatch(setOpenConfirmDeleteOrderObject(value));
	}
	setObjectsSelected(value: OrderObjectsKey) {
		this.dispatch(setObjectsSelected(value));
	}
	setObjectsToProcess(value: OrderObjectsKey) {
		this.dispatch(setObjectsToProcess(value));
	}
	setSelectableOrders(value: SelectableOrders) {
		this.dispatch(setSelectableOrders(value));
	}
	setLoadingSelectableOrders(value: boolean) {
		this.dispatch(setLoadingSelectableOrders(value));
	}
	setSelectedOrder(value: string) {
		this.dispatch(setSelectedOrder(value));
	}
}
