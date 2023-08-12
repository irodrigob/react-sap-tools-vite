import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";

export interface SAPGeneralRedux {
  URLODataCore: string;
  userInfo: UserInfo;
  appsList: AppsList[];
  showListApps: boolean;
  loadingListApps: boolean;
}

const initialState: SAPGeneralRedux = {
  URLODataCore: "",
  userInfo: new UserInfo("", ""),
  appsList: [],
  showListApps: false,
  loadingListApps: false,
};

export const SAPTransportOrderSlice = createSlice({
  name: "SAPGeneral",
  initialState: initialState,
  reducers: {
    setURLODataCore: (state, action: PayloadAction<string>) => {
      state.URLODataCore = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setAppsList: (state, action: PayloadAction<AppsList[]>) => {
      state.appsList = action.payload;
    },
    setShowListApps: (state, action: PayloadAction<boolean>) => {
      state.showListApps = action.payload;
    },
    setLoadingListApps: (state, action: PayloadAction<boolean>) => {
      state.loadingListApps = action.payload;
    },
  },
});

export const {
  setURLODataCore,
  setUserInfo,
  setAppsList,
  setShowListApps,
  setLoadingListApps,
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
