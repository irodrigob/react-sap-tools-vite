import { useMemo, useCallback, useState, useEffect } from "react";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import CellActions from "sap/transportOrder/infraestructure/frontend/components/userOrders/cellComponents/cellActions";
import { FieldsOrdersTreeTable } from "sap/transportOrder/infraestructure/types/transport";
import CellDescription from "sap/transportOrder/infraestructure/frontend/components/userOrders/cellComponents/cellDescription";
import CellUser from "sap/transportOrder/infraestructure/frontend/components/userOrders/cellComponents/cellUser";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import useDataManager from "./useDataManager";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";

export default function useOrdersTreeTable() {
	const {
		rowsExpanded,
		orderListTree,
		orderTaskSelected,
		loadingOrders,
		autoResetExpanded,
		showOrderObjects,
		textSearchOrders,
	} = useAppSelector((state) => state.SAPTransportOrder);
	const { getI18nText } = useTranslations();
	const { searchOrdersTableTree } = useDataManager();
	const [ordersTreeTable, setOrdersTreeTable] = useState<
		FieldsOrdersTreeTable[]
	>([]);
	const { setRowsExpandedAction, setOrderTaskSelectedAction } =
		useSAPTransportOrderStore();

	/*************************************
	 * Funciones
	 ************************************/
	/**
	 * Se guarda la fila que se ha expandido/contraido
	 * @param rowSelected | Fila seleccionada en la Analytic table
	 */
	const setRowExpanded = useCallback(
		(rowSelected: any) => {
			let newRowsExpanded = [...rowsExpanded];
			let tabix = newRowsExpanded.findIndex(
				(row) => row.order == rowSelected.orderTask
			);
			if (tabix !== -1) newRowsExpanded.splice(tabix, tabix >= 0 ? 1 : 0);
			else
				newRowsExpanded.push({
					order: rowSelected.orderTask,
					index: orderListTree.findIndex(
						(row) => row.orderTask == rowSelected.orderTask
					),
				});

			setRowsExpandedAction(newRowsExpanded);
		},
		[rowsExpanded, orderListTree]
	);

	/**
	 * Se guarda la fila que se ha seleccionado/deseleccionado
	 * @param rowSelected | Fila seleccionada en la Analytic table
	 */
	const setRowSelected = useCallback(
		(rowsSelected: FieldsOrdersTreeTable[]) => {
			if (rowsSelected.length > 0) {
				let newOrderTaskSelected = [...orderTaskSelected];
				rowsSelected.forEach((rowSelected) => {
					let tabix = newOrderTaskSelected.findIndex(
						(row: FieldsOrdersTreeTable) =>
							row.orderTask == rowSelected.orderTask
					);
					if (tabix !== -1)
						newOrderTaskSelected.splice(tabix, tabix >= 0 ? 1 : 0);
					else newOrderTaskSelected.push(rowSelected);
				});

				setOrderTaskSelectedAction(newOrderTaskSelected);
			} else {
				setOrderTaskSelectedAction([]);
			}
		},
		[orderTaskSelected]
	);

	/*************************************
	 * Memo
	 ************************************/

	const columnsTreeTable = useMemo(() => {
		let columns: AnalyticalTableColumnDefinition[] = [];

		columns.push(
			{
				Header: getI18nText("transportOrder.tableOrder.labelOrdertask"),
				headerTooltip: getI18nText("transportOrder.tableOrder.labelOrdertask"),
				accessor: "orderTask",
			},
			{
				Header: getI18nText("transportOrder.tableOrder.labelDescription"),
				headerTooltip: getI18nText(
					"transportOrder.tableOrder.labelDescription"
				),
				accessor: "description",
				edit: true,
				required: true,
				Cell: CellDescription,
			}
		);
		if (!showOrderObjects) {
			columns.push(
				{
					Header: getI18nText("transportOrder.tableOrder.labelStatus"),
					headerTooltip: getI18nText("transportOrder.tableOrder.labelStatus"),
					accessor: "statusDesc",
				},
				{
					Header: getI18nText("transportOrder.tableOrder.labelOrderType"),
					headerTooltip: getI18nText(
						"transportOrder.tableOrder.labelOrderType"
					),
					accessor: "typeDesc",
				},
				{
					Header: getI18nText("transportOrder.tableOrder.labelUser"),
					headerTooltip: getI18nText("transportOrder.tableOrder.labelUser"),
					accessor: "user",
					Cell: CellUser,
				}
			);
		}

		columns.push({
			Header: getI18nText("transportOrder.tableOrder.labelActions"),
			headerTooltip: getI18nText("transportOrder.tableOrder.labelActions"),
			accessor: "actions",
			disableFilters: true,
			disableGroupBy: true,
			disableResizing: true,
			disableSortBy: true,
			id: "actions",
			Cell: CellActions,
			width: 135,
		});

		return columns;
	}, [showOrderObjects]);

	// Memo para para poner los índices de los registros expandidos
	const expandedRows = useMemo(() => {
		return rowsExpanded.map((row) => {
			return { [row.index]: true };
		});
	}, [rowsExpanded]);

	/**
	 * No hago uso el useMemo que sería lo más correcto porque la primera que se busca da un error de consola al renderizar.
	 * Creo que es debido al tipo de tabla, que es una tree, porque la misma búsqueda en la tabla de objetos no me da el problema.
	 * Otra nota para el yo del futuro es que el texto de búsqueda esta en Redux porque el texto se usa en varios componentes y con
	 * redux simplifica todo el proceso
	 */
	useEffect(() => {
		if (textSearchOrders == "") setOrdersTreeTable(orderListTree);
		else setOrdersTreeTable(searchOrdersTableTree(textSearchOrders));
	}, [orderListTree, textSearchOrders]);

	return {
		columnsTreeTable,
		expandedRows,
		orderListTree,
		setRowExpanded,
		setRowSelected,
		loadingOrders,
		autoResetExpanded,
		ordersTreeTable,
	};
}
