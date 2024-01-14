import AppStore from "shared/storage/appStore";
import { ADTFavoritePackage } from "sap/adt/domain/entities/favoritePackage";
import { addFavoritePackage, deleteFavoritePackage } from "./adtSlice";

export default class ADTActions extends AppStore {
	addFavoritePackage(favoritePackage: ADTFavoritePackage) {
		this.dispatch(addFavoritePackage(favoritePackage));
	}
	deleteFavoritePackage(id: string) {
		this.dispatch(deleteFavoritePackage(id));
	}
}
