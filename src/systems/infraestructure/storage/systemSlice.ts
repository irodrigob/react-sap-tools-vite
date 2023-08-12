import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import System from "systems/domain/entities/system";
import { type OperationEdit } from "systems/infraestructure/types/system";

export interface SystemRedux {
  systemSelected: System;
  connectedToSystem: boolean;
  URL2ConnectSystem: string;
  openEditSystem: boolean;
  systemEdit: System | null;
  operationEdit: OperationEdit;
}

const initialState: SystemRedux = {
  systemSelected: new System("", "", "", "", "", ""),
  connectedToSystem: false,
  URL2ConnectSystem: "",
  openEditSystem: false,
  systemEdit: null,
  operationEdit: "Add",
};

export const SystemSlice = createSlice({
  name: "System",
  initialState: initialState,
  reducers: {
    setSystemSelected: (state, action: PayloadAction<System>) => {
      state.systemSelected = action.payload;
    },
    setConnectedToSystem: (state, action: PayloadAction<boolean>) => {
      state.connectedToSystem = action.payload;
    },

    setURL2ConnectSystem: (state, action: PayloadAction<string>) => {
      state.URL2ConnectSystem = action.payload;
    },
    setOpenEditSystem: (state, action: PayloadAction<boolean>) => {
      state.openEditSystem = action.payload;
    },
    setSystemEdit: (state, action: PayloadAction<System | null>) => {
      state.systemEdit = action.payload;
    },
    setOperationEdit: (state, action: PayloadAction<OperationEdit>) => {
      state.operationEdit = action.payload;
    },
  },
});

export const {
  setSystemSelected,
  setConnectedToSystem,
  setURL2ConnectSystem,
  setOperationEdit,
  setSystemEdit,
  setOpenEditSystem,
} = SystemSlice.actions;

export default SystemSlice.reducer;
