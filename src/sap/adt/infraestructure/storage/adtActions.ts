import AppStore from "shared/storage/appStore";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import {
	addFavoritePackage,
	deleteFavoritePackage,
	setFavoritePackages,
} from "./adtSlice";

export default class ADTActions extends AppStore {
	addFavoritePackage(favoritePackage: ADTFavoritePackage) {
		this.dispatch(addFavoritePackage(favoritePackage));
	}
	deleteFavoritePackage(id: string) {
		this.dispatch(deleteFavoritePackage(id));
	}
	setFavoritePackages(favoritePackages: ADTFavoritePackages) {
		this.dispatch(setFavoritePackages(favoritePackages));
	}
}
