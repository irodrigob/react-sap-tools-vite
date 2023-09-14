import AppStore from "shared/storage/appStore";
import {
	setURLODataCore,
	setUserInfo,
	setAppsList,
	setLoadingListApps,
	setShowListApps,
	setSystemChanged,
	setApplicationChanged,
} from "sap/general/infraestructure/storage/SAPGeneralSlice";
import UserInfo from "sap/general/domain/entities/userInfo";
import AppsList from "sap/general/domain/entities/appsList";

export default class SAPGeneralActions extends AppStore {
	setURLODataCore(value: string) {
		this.dispatch(setURLODataCore(value));
	}
	setUserInfo(value: UserInfo) {
		this.dispatch(setUserInfo(value));
	}
	setAppsList(value: AppsList[]) {
		this.dispatch(setAppsList(value));
	}
	setShowListApps(value: boolean) {
		this.dispatch(setShowListApps(value));
	}
	setLoadingListApps(value: boolean) {
		this.dispatch(setLoadingListApps(value));
	}
	setSystemChanged(value: boolean) {
		this.dispatch(setSystemChanged(value));
	}
	setApplicationChanged(value: boolean) {
		this.dispatch(setApplicationChanged(value));
	}
}
