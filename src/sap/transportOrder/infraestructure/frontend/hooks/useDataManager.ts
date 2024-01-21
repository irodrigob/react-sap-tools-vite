import { useCallback } from "react";
import {
	FieldsOrdersTreeTable,
	FieldsTaskTreeTable,
	EditableRowsField,
	RowsExpanded,
	OrderObjects,
} from "sap/transportOrder/infraestructure/types/transport";
import { useAppSelector } from "shared/storage/useStore";
import Properties from "shared/utils/types/properties";
import { initialrowDataForUpdate } from "sap/transportOrder/infraestructure/storage/initialValues";
import {
	userOrdersDTO,
	releaseOrdersDTOArray,
} from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import ArrayUtils from "shared/utils/array/arrayUtils";
import { STATUS } from "sap/transportOrder/infraestructure/utils/constants/constantsTransportOrder";
import useSAPTransportOrderStore from "./useSAPTransportOrderStore";

/**
 * Devuelve si una orden/tarea es editable
 * @param rowOrderTask | Datos de la orden o tarea
 */
const isOrderTaskEditable = (
	rowOrderTask: FieldsOrdersTreeTable | FieldsTaskTreeTable
): boolean => {
	if (
		rowOrderTask.status == STATUS.RELEASED ||
		rowOrderTask.status == STATUS.RELEASE_STARTED
	)
		return false;
	else return true;
};

/*
 * Devuelve si una orden/tarea se puede borrar
 * @param rowOrderTask | Datos de la orden o tarea
 */
const isOrderTaskDeletable = (
	rowOrderTask: FieldsOrdersTreeTable | FieldsTaskTreeTable
): boolean => {
	// Las liberaciones iniciadas permite borrarlas porque muchas veces se quedan colgadas
	// y tiene sentido poderlas borrar
	if (rowOrderTask.status == STATUS.RELEASED) return false;
	else return true;
};

export default function useDataManager() {
	const { rowDataForUpdate, orderListTree, ordersObjectsSelected } =
		useAppSelector((state) => state.SAPTransportOrder);
	const {
		setOrderListTreeAction,
		setEditingRowAction,
		setAutoResetExpandedAction,
		setRowDataForUpdateAction,
		setRowsExpandedAction,
	} = useSAPTransportOrderStore();
	/**
	 * Convierte la lista de ordenes del usuario en una jerarquía
	 * @param userOrdersList Lista de ordenes del usuario
	 * @returns Arbol con ordenes y tareas
	 */
	const adaptSAPOrders2TreeTable = useCallback(
		(userOrdersList: userOrdersDTO[]): FieldsOrdersTreeTable[] => {
			let orderGrouped = ArrayUtils.groupBy<userOrdersDTO>(
				userOrdersList,
				(e) => e.order
			);

			let treeTable: FieldsOrdersTreeTable[] = [];
			for (const order in orderGrouped) {
				let orderData: FieldsOrdersTreeTable = {
					row_editing: false,
					row_deletable: false,
					orderTask: order,
					description: orderGrouped[order][0].orderDesc,
					description_edit: true,
					status: orderGrouped[order][0].orderStatus,
					statusDesc: orderGrouped[order][0].orderStatusDesc,
					type: orderGrouped[order][0].orderType,
					typeDesc: orderGrouped[order][0].orderTypeDesc,
					user: orderGrouped[order][0].orderUser,
					hasObjects: orderGrouped[order][0]?.orderHasObjects
						? orderGrouped[order][0]?.orderHasObjects
						: false,
					levelTree: "order",
					user_edit: true,
					row_editable: true,
					subRows: [],
				};
				// En la rutina se determina si la celda es editable, aunque por defecto que no puede ser edtiable.
				// La rutina que se llama se aprovecha en otros procesos por lo que tengo que llamar justo después de inicializar
				// las ordenes y tareas
				orderData.row_editable = isOrderTaskEditable(orderData);
				orderData.row_deletable = isOrderTaskDeletable(orderData);

				// Datos de la tarea
				orderGrouped[order].forEach((task: userOrdersDTO) => {
					// Solo se añade las tareas que tienen numero informadas. Si esta en blanco
					// son ordenes sin tareas.
					if (task.task != "") {
						let taskData: FieldsTaskTreeTable = {
							row_editing: false,
							row_deletable: false,
							orderTask: task.task,
							description: task.taskDesc,
							description_edit: true,
							status: task.taskStatus,
							statusDesc: task.taskStatusDesc,
							type: task.taskType,
							typeDesc: task.taskTypeDesc,
							user: task.taskUser,
							user_edit: true,
							row_editable: true,
							parent_order: orderData.orderTask,
							hasObjects: task?.taskHasObjects ? task.taskHasObjects : false,
							levelTree: "task",
						};
						taskData.row_editable = isOrderTaskEditable(taskData);
						taskData.row_deletable = isOrderTaskDeletable(taskData);

						orderData.subRows.push(taskData);
					}
				});

				treeTable.push(orderData as FieldsOrdersTreeTable);
			}

			return treeTable;
		},
		[]
	);

	/**
	 * Proceso post lectura de las ordenes del usuario. En este proceso
	 * se transforma los datos a una tabla compatible con el componente
	 * @param orders
	 */
	const postLoadUserOrder = (orders: userOrdersDTO[]) => {
		let orderTreeList = adaptSAPOrders2TreeTable(orders);
		// Se guarda los datos de manera original, es decir, por si es necesario hacer comprobaciones
		setOrderListTreeAction(orderTreeList);
	};

	/**
	 * Habilita/deshabilita que se esta editando una fila
	 * @param editing | Editando verdadero o falso
	 */
	const setEditingRow = useCallback((editing: boolean) => {
		setEditingRowAction(editing);
	}, []);
	/**
	 * Habilita/Deshabilita un registro editable
	 * @param row | Fila del registro seleccionado
	 */
	const enableRowEditable = useCallback(
		(row: FieldsOrdersTreeTable | FieldsTaskTreeTable, enabled: boolean) => {
			// Este estado sirve para habilitar/deshabilitar a nivel global la edición cuando se edita una fila.
			setEditingRow(enabled);

			let orderIndex = getOrderIndexFromOrder(
				row.levelTree == "task"
					? (row as FieldsTaskTreeTable).parent_order
					: row.orderTask
			);

			// El structuedClone permite clonar el array de manera profunda evitando el freeze que hace redux al estado. lo
			// que me simplifica de mala manera los procesos.
			let newOrderList = structuredClone(orderListTree);

			if (row.levelTree == "task") {
				let taskIndex = newOrderList[orderIndex].subRows.findIndex(
					(task) => task.orderTask == row.orderTask
				);
				newOrderList[orderIndex].subRows[taskIndex].row_editing = enabled;
			} else {
				newOrderList[orderIndex].row_editing = enabled;
			}

			setOrderListTreeAction(newOrderList);
		},
		[orderListTree]
	);

	/**
	 * Actualiza los datos en el modelo de datos
	 * @param updateData | Datos de la orden o de la tarea
	 */
	const updateDataModel = useCallback(
		(updateData: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
			// Fuerzo a que no se resete las columnas expandidas una vez el modelo cambia de datos para que
			// en pantalla se vea el cambio realizado
			setAutoResetExpandedAction(false);

			let orderIndex = getOrderIndexFromOrder(
				updateData.levelTree == "task"
					? (updateData as FieldsTaskTreeTable).parent_order
					: updateData.orderTask
			);

			// El structuredClone permite clonar el array de manera profunda evitando el freeze que hace redux al estado. lo
			// que me simplifica de mala manera los procesos.
			let newOrderList = structuredClone(orderListTree);

			if (updateData.levelTree == "task") {
				let taskIndex = newOrderList[orderIndex].subRows.findIndex(
					(task) => task.orderTask == updateData.orderTask
				);
				newOrderList[orderIndex].subRows[taskIndex] =
					updateData as FieldsTaskTreeTable;
			} else {
				newOrderList[orderIndex] = updateData as FieldsOrdersTreeTable;
			}
			setOrderListTreeAction(newOrderList);
		},
		[orderListTree]
	);

	/**
	 * Devuelve el indice registro de la orden a partir del ID pasado
	 * @param order | Orden o tarea
	 */
	const getOrderIndexFromOrder = useCallback(
		(order: string): number => {
			return orderListTree.findIndex((row) => row.orderTask == order);
		},
		[orderListTree]
	);

	/**
	 * Actualiza el valor de un campo en una fila
	 * @param row | Fila de datos
	 * @param field | Campo
	 * @param value | Valor
	 */
	const updateDataEditingRow = useCallback(
		<K extends keyof EditableRowsField>(
			field: K,
			value: EditableRowsField[K]
		): void => {
			let newValues = { ...rowDataForUpdate };

			Properties.set(newValues, field, value);
			setRowDataForUpdateAction(newValues);
		},
		[rowDataForUpdate]
	);
	/**
	 * Inicializa los valores para la edición de los datos
	 * @param row | Fila de datos
	 */
	const initValuesDataEditingRow = useCallback(
		(row: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
			let newValues = { ...initialrowDataForUpdate };
			newValues.description = row.description;
			newValues.user = row.user;
			newValues.orderTask = row.orderTask;

			setRowDataForUpdateAction(newValues);
		},
		[initialrowDataForUpdate]
	);
	/**
	 * Inicializa la estructura de los datos que se editan
	 */
	const resetValuesDataEditingRow = useCallback(() => {
		setRowDataForUpdateAction({
			...initialrowDataForUpdate,
		});
	}, [initialrowDataForUpdate]);

	/**
	 * Transfiere los datos de la estructura de datos a modificar a la estructura del listado
	 * @returns | Devuelve la fila de tabla con los datos actualizados
	 */
	const transferEditingRow2ModelData = useCallback(():
		| FieldsOrdersTreeTable
		| FieldsTaskTreeTable => {
		let orderIndex = getOrderIndexFromOrder(
			rowDataForUpdate.levelTree == "task"
				? (rowDataForUpdate?.parent_order as string)
				: rowDataForUpdate.orderTask
		);

		let orderRow = { ...orderListTree[orderIndex] };

		// Datos de orden
		if (rowDataForUpdate.levelTree == "order") {
			orderRow.description = rowDataForUpdate.description;
			orderRow.user = rowDataForUpdate.user;
			return orderRow;
		} else {
			let taskRow = {
				...orderRow.subRows.find(
					(row) => row.orderTask == rowDataForUpdate.orderTask
				),
			};
			taskRow.description = rowDataForUpdate.description;
			taskRow.user = rowDataForUpdate.user;
			return taskRow as FieldsTaskTreeTable;
		}
	}, [rowDataForUpdate, orderListTree]);

	/**
	 * Devuelve si hay errores en los datos a actualizar.
	 * @returns Devuelve
	 */
	const existErrorDataForUpdate = (): boolean => {
		return rowDataForUpdate.description_error || rowDataForUpdate.user_error;
	};

	/**
	 * Actualiza los campos después de liberar una orden
	 * @param ordersReleased | Ordenes liberadas
	 */
	const updateDataFromReleaseOrder = (
		ordersReleased: releaseOrdersDTOArray
	) => {
		// Fuerzo a que no se resete las columnas expandidas una vez el modelo cambia de datos para que
		// en pantalla se vea el cambio realizado
		setAutoResetExpandedAction(false);

		let newOrderList = structuredClone(orderListTree);
		ordersReleased.map((orderReleased) => {
			let rowIndex = orderListTree.findIndex(
				(row) => row.orderTask == orderReleased.order
			);

			if (rowIndex != -1) {
				// Si no hay tarea es que se libera la orden
				if (orderReleased.task == "") {
					newOrderList[rowIndex].status = orderReleased.status;
					newOrderList[rowIndex].statusDesc = orderReleased.statusDesc;

					newOrderList[rowIndex].row_editable = isOrderTaskEditable(
						newOrderList[rowIndex]
					);
				} else {
					let taskIndex = newOrderList[rowIndex].subRows.findIndex(
						(row) => row.orderTask == orderReleased.task
					);
					if (taskIndex != -1) {
						newOrderList[rowIndex].subRows[taskIndex].status =
							orderReleased.status;
						newOrderList[rowIndex].subRows[taskIndex].statusDesc =
							orderReleased.statusDesc;

						newOrderList[rowIndex].subRows[taskIndex].row_editable =
							isOrderTaskEditable(newOrderList[rowIndex].subRows[taskIndex]);
					}
				}
			}
		});
		setOrderListTreeAction(newOrderList);
	};

	/**
	 * Actualiza los datos en el modelo de datos
	 * @param updateData | Datos de la orden o de la tarea
	 */
	const deleteOrderModel = useCallback(
		(deleteData: FieldsOrdersTreeTable | FieldsTaskTreeTable) => {
			// Fuerzo a que no se resete las columnas expandidas una vez el modelo cambia de datos para que
			// en pantalla se vea el cambio realizado
			setAutoResetExpandedAction(false);

			let orderIndex = getOrderIndexFromOrder(
				deleteData.levelTree == "task"
					? (deleteData as FieldsTaskTreeTable).parent_order
					: deleteData.orderTask
			);

			let newOrderList = structuredClone(orderListTree);

			if (deleteData.levelTree == "task") {
				let taskIndex = newOrderList[orderIndex].subRows.findIndex(
					(task) => task.orderTask == deleteData.orderTask
				);
				newOrderList[orderIndex].subRows.splice(
					taskIndex,
					taskIndex >= 0 ? 1 : 0
				);
			} else {
				newOrderList.splice(orderIndex, orderIndex >= 0 ? 1 : 0);
			}
			setOrderListTreeAction(newOrderList);
		},
		[orderListTree]
	);

	/**
	 * Añade una nueva orden al modelo
	 * @param data | Datos de la nueva orde
	 */
	const addNewOrder = useCallback(
		(data: userOrdersDTO) => {
			let newTreeOrder = adaptSAPOrders2TreeTable(Array(data));
			let treeOrder = newTreeOrder.concat(orderListTree);

			setOrderListTreeAction(treeOrder);
		},
		[orderListTree]
	);

	/**
	 * Búsqueda del texto pasado por parámetro en la tabla de ordenes en formato arbol
	 * @param {string} searchText | Texto a buscar
	 */
	const searchOrdersTableTree = useCallback(
		(searchText: string): FieldsOrdersTreeTable[] => {
			let newOrdersList: FieldsOrdersTreeTable[] = [];
			let newRowsExpanded: RowsExpanded = [];

			// El autoResetExpanded funciona de esta manera: si vale false no se resetea las filas expandidas aunque
			// cambie los valores. Ignorando lo que se le pasa por defecto de filas expandidad. Por ello cuando
			// hay texto de búsqueda lo pongo a true porque entonces hace caso del valor de filas expandidas por defecto.
			let autoResetExpanded = true;

			if (searchText == "") {
				newOrdersList = orderListTree;
			} else {
				// Se desactiva el auto reset para que funcione el expandir automático de las filas encontradas
				autoResetExpanded = true;
				let newSearchText = searchText.toUpperCase().trim();

				orderListTree.forEach((row: FieldsOrdersTreeTable) => {
					// Filtramos por las tareas
					let filterSubRows = row.subRows.filter((subRow) => {
						return searchTextRowOrderTree(subRow, newSearchText);
					});
					let filterRow = searchTextRowOrderTree(row, newSearchText);

					// Si hay tareas devuelvo la orden y con las tareas subfiltradas. Si no hay tareas
					// pero si que conicide la orden entonces devuelvo la fila entera
					if (filterSubRows.length > 0) {
						newOrdersList.push({
							...row,
							subRows: filterSubRows,
						});
						newRowsExpanded.push({
							order: row.orderTask,
							index: newOrdersList.findIndex(
								(newRow) => newRow.orderTask == row.orderTask
							),
						});
					} else if (filterRow) {
						newOrdersList.push({ ...row });
						newRowsExpanded.push({
							order: row.orderTask,
							index: newOrdersList.findIndex(
								(newRow) => newRow.orderTask == row.orderTask
							),
						});
					}
				});
			}
			setAutoResetExpandedAction(autoResetExpanded);
			setRowsExpandedAction(newRowsExpanded);

			return newOrdersList;
		},
		[orderListTree]
	);

	/**
	 * Búsqueda de un texto en la fila de ordenes/tareas
	 * @param {object} row
	 * @param {string} searchText
	 * @returns | Fila si se cumplen los datos
	 */
	const searchTextRowOrderTree = useCallback(
		(row: FieldsTaskTreeTable | FieldsOrdersTreeTable, searchText: string) => {
			if (
				row.orderTask.includes(searchText) ||
				row.description.toUpperCase().includes(searchText) ||
				row.statusDesc.toUpperCase().includes(searchText) ||
				row.typeDesc.toUpperCase().includes(searchText) ||
				row.user.toUpperCase().includes(searchText)
			)
				return row;
			else return null;
		},
		[]
	);
	/**
	 * Actualiza el campo de tiene objetos en base a los objetos de la orden
	 * @param orderObject | Objetos de las ordenes
	 */
	const udpateHasObjects = useCallback(
		(orderObjects: OrderObjects) => {
			let newOrderListTree = structuredClone(orderListTree);

			orderObjects.forEach((orderObject) => {
				let orderSelected = ordersObjectsSelected.find(
					(row) => row.order == orderObject.order
				);
				if (orderSelected) {
					let parentOrder =
						orderSelected.parent_order == ""
							? (orderSelected?.order as string)
							: (orderSelected?.parent_order as string);

					let orderIndex = newOrderListTree.findIndex(
						(row) => row.orderTask == parentOrder
					);

					if (orderSelected.parent_order == "") {
						newOrderListTree[orderIndex].hasObjects =
							orderObject.objects.length > 0 ? true : false;
					} else {
						let taskIndex = newOrderListTree[orderIndex].subRows.findIndex(
							(row) => row.orderTask == orderSelected?.order
						);
						if (taskIndex != -1)
							newOrderListTree[orderIndex].subRows[taskIndex].hasObjects =
								orderObject.objects.length > 0 ? true : false;
					}
				}
			});
			setOrderListTreeAction(newOrderListTree);
		},
		[orderListTree]
	);

	return {
		enableRowEditable,
		updateDataModel,
		updateDataEditingRow,
		initValuesDataEditingRow,
		resetValuesDataEditingRow,
		transferEditingRow2ModelData,
		existErrorDataForUpdate,
		setEditingRow,
		updateDataFromReleaseOrder,
		postLoadUserOrder,
		deleteOrderModel,
		adaptSAPOrders2TreeTable,
		addNewOrder,
		searchOrdersTableTree,
		udpateHasObjects,
	};
}
