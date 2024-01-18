import { useCallback } from "react";
import SAPController from "sap/general/infraestructure/controller/sapController";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";

export default function useSAPGeneralStore() {
	const sapController = new SAPController();
	const sapGeneralActions = new SAPGeneralActions();

	const setShowListApps = useCallback((visible: boolean) => {
		sapGeneralActions.setShowListApps(visible);
	}, []);
	const setLoadingListApps = useCallback((loading: boolean) => {
		sapGeneralActions.setLoadingListApps(loading);
	}, []);
	const clearVariables = useCallback(() => {
		sapGeneralActions.setAppsList([]);
		sapGeneralActions.setApplicationChanged(false);
	}, []);
	const addAdtApp2Store = useCallback(() => {
		sapGeneralActions.setAppsList([{ ...sapController.ADTAppList() }]);
	}, []);
	const setURLODataCore = useCallback((url: string) => {
		sapGeneralActions.setURLODataCore(url);
	}, []);

	return {
		setShowListApps,
		setLoadingListApps,
		clearVariables,
		addAdtApp2Store,
		setURLODataCore,
	};
}
