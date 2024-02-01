import { useCallback } from "react";
import { useDispatch } from "react-redux";
import SAPController from "sap/general/infraestructure/controller/sapController";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";
import {
	setUserInfo,
	setAppsList,
	setShowListApps,
	setSystemChanged,
	setApplicationChanged,
	setLoadingListApps,
	setURLODataCore,
} from "sap/general/infraestructure/storage/SAPGeneralSlice";

/**
 * NOTA: Mezco las dos manera de guardar en la store para tener el conocimiento de como hacerlo.
 */
export default function useSAPGeneralStore() {
	const sapController = new SAPController();
	const dispatch = useDispatch();

	const setShowListAppsAction = useCallback((visible: boolean) => {
		dispatch(setShowListApps(visible));
	}, []);
	const setLoadingListAppsAction = useCallback((loading: boolean) => {
		dispatch(setLoadingListApps(loading));
	}, []);
	const clearVariablesAction = useCallback(() => {
		dispatch(setApplicationChanged(false));
	}, []);
	const addAdtApp2StoreAction = useCallback(() => {
		dispatch(setAppsList([{ ...sapController.ADTAppList() }]));
	}, []);
	const setURLODataCoreAction = useCallback((url: string) => {
		dispatch(setURLODataCore(url));
	}, []);
	const setUserInfoAction = useCallback((userInfo: UserInfo) => {
		dispatch(setUserInfo(userInfo));
	}, []);
	const setAppsListAction = useCallback((appsList: AppsList[]) => {
		dispatch(setAppsList(appsList));
	}, []);
	const setSystemChangedAction = useCallback((value: boolean) => {
		dispatch(setSystemChanged(value));
	}, []);
	const setApplicationChangedAction = useCallback((value: boolean) => {
		dispatch(setApplicationChanged(value));
	}, []);

	return {
		setShowListAppsAction,
		setLoadingListAppsAction,
		clearVariablesAction,
		addAdtApp2StoreAction,
		setURLODataCoreAction,
		setUserInfoAction,
		setAppsListAction,
		setSystemChangedAction,
		setApplicationChangedAction,
	};
}
