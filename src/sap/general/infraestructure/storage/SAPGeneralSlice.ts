import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";

export interface SAPGeneralRedux {
	URLODataCore: string;
	userInfo: UserInfo;
	appsList: AppsList[];
	showListApps: boolean;
	loadingListApps: boolean;
	systemChanged: boolean;
	applicationChanged: boolean;
	executedInitialSAPToolsServices: boolean;
}

const initialState: SAPGeneralRedux = {
	URLODataCore: "",
	userInfo: new UserInfo("", ""),
	appsList: [],
	showListApps: false,
	loadingListApps: false,
	systemChanged: false,
	applicationChanged: false,
	executedInitialSAPToolsServices: false,
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
		setSystemChanged: (state, action: PayloadAction<boolean>) => {
			state.systemChanged = action.payload;
		},
		setApplicationChanged: (state, action: PayloadAction<boolean>) => {
			state.applicationChanged = action.payload;
		},
		setExecutedInitialSAPToolsServices: (
			state,
			action: PayloadAction<boolean>
		) => {
			state.executedInitialSAPToolsServices = action.payload;
		},
	},
});

export const {
	setURLODataCore,
	setUserInfo,
	setAppsList,
	setShowListApps,
	setLoadingListApps,
	setSystemChanged,
	setApplicationChanged,
	setExecutedInitialSAPToolsServices,
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
