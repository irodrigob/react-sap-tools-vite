import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ValueState } from "@ui5/webcomponents-react";
import {
  ToolbarFilters,
  ToolbarFiltersState,
  FieldsOrdersTreeTable,
  FieldsTaskTreeTable,
  RowsExpanded,
  EditableRowsField,
  SystemUsers,
  OrderObjects,
  OrderObjectsSelected,
  OrderObjectsKey,
} from "sap/transportOrder/infraestructure/types/transport";
import { userOrdersDTO } from "sap/transportOrder/infraestructure/dto/transportOrderDTO";
import SystemsTransport from "sap/transportOrder/domain/entities/systemsTransport";
import { initialrowDataForUpdate } from "./initialValues";
import { SelectableOrders } from "sap/transportOrder/domain/entities/selectableOrders";

export interface SAPTransportOrderRedux {
  toolbarFilters: ToolbarFilters;
  toolbarFiltersState: ToolbarFiltersState;
  loadingOrders: boolean;
  orderList: userOrdersDTO[];
  orderListTree: FieldsOrdersTreeTable[];
  systemTransportCopy: string;
  descriptionTransportCopy: string;
  systemsTransportCopy: SystemsTransport[];
  orderTaskSelected: FieldsOrdersTreeTable[];
  rowsExpanded: RowsExpanded;
  autoResetExpanded: boolean;
  editingRow: boolean;
  rowDataForUpdate: EditableRowsField;
  systemUsers: SystemUsers;
  openConfirmeDelete: boolean;
  rowOrderCellAction: FieldsOrdersTreeTable | FieldsTaskTreeTable | null;
  textSearchOrders: string;
  showOrderObjects: boolean;
  orderObjects: OrderObjects;
  ordersObjectsSelected: OrderObjectsSelected;
  openConfirmDeleteOrderObject: boolean;
  objectsSelected: OrderObjectsKey;
  objectsToProcess: OrderObjectsKey;
  selectableOrders: SelectableOrders;
  loadingSelectableOrders: boolean;
  selectedOrder: string;
}

const initialtoolbarFilters: ToolbarFilters = {
  orderTypes: [],
  orderStatus: [],
  releaseDateFrom: null,
};

const initialToolbarFiltersState: ToolbarFiltersState = {
  orderTypes: ValueState.None,
  orderTypesDesc: "",
  orderStatus: ValueState.None,
  orderStatusDesc: "",
  releaseDate: ValueState.None,
  releaseDateDesc: "",
};

const initialState: SAPTransportOrderRedux = {
  toolbarFilters: initialtoolbarFilters,
  toolbarFiltersState: initialToolbarFiltersState,
  loadingOrders: false,
  orderList: [],
  orderListTree: [],
  systemTransportCopy: "",
  descriptionTransportCopy: "",
  systemsTransportCopy: [],
  orderTaskSelected: [],
  rowsExpanded: [],
  autoResetExpanded: false,
  editingRow: false,
  rowDataForUpdate: initialrowDataForUpdate,
  systemUsers: [],
  openConfirmeDelete: false,
  rowOrderCellAction: null,
  textSearchOrders: "",
  showOrderObjects: false,
  orderObjects: [],
  ordersObjectsSelected: [],
  openConfirmDeleteOrderObject: false,
  objectsSelected: [],
  objectsToProcess: [],
  selectableOrders: [],
  loadingSelectableOrders: false,
  selectedOrder: "",
};

export const SAPTransportOrderSlice = createSlice({
  name: "SAPTransportOrder",
  initialState: initialState,
  reducers: {
    setToolbarFilters: (state, action: PayloadAction<ToolbarFilters>) => {
      state.toolbarFilters = action.payload;
    },
    setToolbarFiltersState: (
      state,
      action: PayloadAction<ToolbarFiltersState>
    ) => {
      state.toolbarFiltersState = action.payload;
    },
    setLoadingOrders: (state, action: PayloadAction<boolean>) => {
      state.loadingOrders = action.payload;
    },
    setOrderListTree: (
      state,
      action: PayloadAction<FieldsOrdersTreeTable[]>
    ) => {
      state.orderListTree = action.payload;
    },
    setSystemsTransportCopy: (
      state,
      action: PayloadAction<SystemsTransport[]>
    ) => {
      state.systemsTransportCopy = action.payload;
    },
    setSystemTransportCopy: (state, action: PayloadAction<string>) => {
      state.systemTransportCopy = action.payload;
    },
    setDescriptionTransportCopy: (state, action: PayloadAction<string>) => {
      state.descriptionTransportCopy = action.payload;
    },
    setOrderTaskSelected: (
      state,
      action: PayloadAction<FieldsOrdersTreeTable[]>
    ) => {
      state.orderTaskSelected = action.payload;
    },
    updateOrderTaskComponent: (
      state,
      action: PayloadAction<FieldsOrdersTreeTable>
    ) => {
      // No funciona el acceso por indice directo a la tabla. La única solucion que he visto
      // es hacer un map del array, y cuando el ID que viene en el payload actualizar los datos
      state.orderListTree.map((row, index) => {
        if (row.orderTask == action.payload.orderTask) {
          state.orderListTree[index] = action.payload;
        }
      });
    },
    setRowsExpanded: (state, action: PayloadAction<RowsExpanded>) => {
      state.rowsExpanded = action.payload;
    },
    setAutoResetExpanded: (state, action: PayloadAction<boolean>) => {
      state.autoResetExpanded = action.payload;
    },
    setEditingRow: (state, action: PayloadAction<boolean>) => {
      state.editingRow = action.payload;
    },
    setRowDataForUpdate: (state, action: PayloadAction<EditableRowsField>) => {
      state.rowDataForUpdate = action.payload;
    },
    setSystemUsers: (state, action: PayloadAction<SystemUsers>) => {
      state.systemUsers = action.payload;
    },
    setOpenConfirmeDelete: (state, action: PayloadAction<boolean>) => {
      state.openConfirmeDelete = action.payload;
    },
    setRowOrderCellAction: (
      state,
      action: PayloadAction<FieldsOrdersTreeTable | FieldsTaskTreeTable | null>
    ) => {
      state.rowOrderCellAction = action.payload;
    },
    setTextSearchOrders: (state, action: PayloadAction<string>) => {
      state.textSearchOrders = action.payload;
    },
    setShowOrderObjects: (state, action: PayloadAction<boolean>) => {
      state.showOrderObjects = action.payload;
    },
    setOrderObjects: (state, action: PayloadAction<OrderObjects>) => {
      state.orderObjects = action.payload;
    },
    setOrdersObjectsSelected: (
      state,
      action: PayloadAction<OrderObjectsSelected>
    ) => {
      state.ordersObjectsSelected = action.payload;
    },
    setOpenConfirmDeleteOrderObject: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.openConfirmDeleteOrderObject = action.payload;
    },
    setObjectsSelected: (state, action: PayloadAction<OrderObjectsKey>) => {
      state.objectsSelected = action.payload;
    },
    setObjectsToProcess: (state, action: PayloadAction<OrderObjectsKey>) => {
      state.objectsToProcess = action.payload;
    },
    setSelectableOrders: (state, action: PayloadAction<SelectableOrders>) => {
      state.selectableOrders = action.payload;
    },
    setLoadingSelectableOrders: (state, action: PayloadAction<boolean>) => {
      state.loadingSelectableOrders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<string>) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const {
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
  setRowOrderCellAction,
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
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
