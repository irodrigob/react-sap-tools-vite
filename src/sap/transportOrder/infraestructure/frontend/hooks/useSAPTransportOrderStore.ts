import { useCallback } from "react";
import { useDispatch } from "react-redux";
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
} from "sap/transportOrder/infraestructure/storage/sapTransportOrderSlice";
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
import { initialrowDataForUpdate } from "sap/transportOrder/infraestructure/storage/initialValues";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";

export default function useSAPTransportOrderStore() {
	const dispatch = useDispatch();

	const setToolbarFiltersAction = useCallback((value: ToolbarFilters) => {
		dispatch(setToolbarFilters(value));
	}, []);

	const setToolbarFiltersStateAction = useCallback(
		(value: ToolbarFiltersState) => {
			dispatch(setToolbarFiltersState(value));
		},
		[]
	);
	const setLoadingOrdersAction = useCallback((value: boolean) => {
		dispatch(setLoadingOrders(value));
	}, []);
	const setOrderListTreeAction = useCallback(
		(value: FieldsOrdersTreeTable[]) => {
			dispatch(setOrderListTree(value));
		},
		[]
	);
	const setSystemsTransportCopyAction = useCallback(
		(value: SystemsTransport[]) => {
			dispatch(setSystemsTransportCopy(value));
		},
		[]
	);
	const setSystemTransportCopyAction = useCallback((value: string) => {
		dispatch(setSystemTransportCopy(value));
	}, []);
	const setDescriptionTransportCopyAction = useCallback((value: string) => {
		dispatch(setDescriptionTransportCopy(value));
	}, []);
	const setOrderTaskSelectedAction = useCallback(
		(value: FieldsOrdersTreeTable[]) => {
			dispatch(setOrderTaskSelected(value));
		},
		[]
	);
	const updateOrderTaskComponentAction = useCallback(
		(value: FieldsOrdersTreeTable) => {
			dispatch(updateOrderTaskComponent(value));
		},
		[]
	);
	const setRowsExpandedAction = useCallback((value: RowsExpanded) => {
		dispatch(setRowsExpanded(value));
	}, []);
	const setAutoResetExpandedAction = useCallback((value: boolean) => {
		dispatch(setAutoResetExpanded(value));
	}, []);
	const setEditingRowAction = useCallback((value: boolean) => {
		dispatch(setEditingRow(value));
	}, []);
	const setRowDataForUpdateAction = useCallback((value: EditableRowsField) => {
		dispatch(setRowDataForUpdate(value));
	}, []);
	const resetRowDataForUpdateAction = useCallback(() => {
		dispatch(setRowDataForUpdate(initialrowDataForUpdate));
	}, []);
	const setSystemUsersAction = useCallback((users: SystemUsers) => {
		dispatch(setSystemUsers(users));
	}, []);
	const setOpenConfirmDeleteAction = useCallback((value: boolean) => {
		dispatch(setOpenConfirmeDelete(value));
	}, []);
	const setRowOrderCellAction = useCallback(
		(row: FieldsOrdersTreeTable | FieldsTaskTreeTable | null) => {
			dispatch(setRowOrderCell(row));
		},
		[]
	);
	const setTextSearchOrdersAction = useCallback((value: string) => {
		dispatch(setTextSearchOrders(value));
	}, []);
	const setShowOrderObjectsAction = useCallback((value: boolean) => {
		dispatch(setShowOrderObjects(value));
	}, []);
	const setOrderObjectsAction = useCallback((value: OrderObjects) => {
		dispatch(setOrderObjects(value));
	}, []);
	const setOrdersObjectsSelectedAction = useCallback(
		(value: OrderObjectsSelected) => {
			dispatch(setOrdersObjectsSelected(value));
		},
		[]
	);
	const setOpenConfirmDeleteOrderObjectAction = useCallback(
		(value: boolean) => {
			dispatch(setOpenConfirmDeleteOrderObject(value));
		},
		[]
	);
	const setObjectsSelectedAction = useCallback((value: OrderObjectsKey) => {
		dispatch(setObjectsSelected(value));
	}, []);
	const setObjectsToProcessAction = useCallback((value: OrderObjectsKey) => {
		dispatch(setObjectsToProcess(value));
	}, []);
	const setSelectableOrdersAction = useCallback((value: SelectableOrders) => {
		dispatch(setSelectableOrders(value));
	}, []);
	const setLoadingSelectableOrdersAction = useCallback((value: boolean) => {
		dispatch(setLoadingSelectableOrders(value));
	}, []);
	const setSelectedOrderAction = useCallback((value: string) => {
		dispatch(setSelectedOrder(value));
	}, []);
	const clearVariablesObjects = useCallback((): void => {
		setOrderObjectsAction([]);
		setOrdersObjectsSelectedAction([]);
		setShowOrderObjectsAction(false);
		setSelectedOrderAction("");
	}, []);

	return {
		setToolbarFiltersAction,
		setToolbarFiltersStateAction,
		setLoadingOrdersAction,
		setOrderListTreeAction,
		setSystemsTransportCopyAction,
		setSystemTransportCopyAction,
		setDescriptionTransportCopyAction,
		setOrderTaskSelectedAction,
		updateOrderTaskComponentAction,
		setRowsExpandedAction,
		setAutoResetExpandedAction,
		setEditingRowAction,
		setRowDataForUpdateAction,
		resetRowDataForUpdateAction,
		setSystemUsersAction,
		setOpenConfirmDeleteAction,
		setRowOrderCellAction,
		setTextSearchOrdersAction,
		setShowOrderObjectsAction,
		setOrderObjectsAction,
		setOrdersObjectsSelectedAction,
		setOpenConfirmDeleteOrderObjectAction,
		setObjectsSelectedAction,
		setObjectsToProcessAction,
		setSelectableOrdersAction,
		setLoadingSelectableOrdersAction,
		setSelectedOrderAction,
		clearVariablesObjects,
	};
}
