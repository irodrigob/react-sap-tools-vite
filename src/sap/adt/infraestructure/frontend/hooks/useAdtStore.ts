import { TreeAttributes } from "sap/adt/domain/entities/treeAttributes";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import {
	addFavoritePackage,
	deleteFavoritePackage,
	setFavoritePackages,
	setFavPackageTreeAttributes,
} from "sap/adt/infraestructure/storage/adtSlice";
export default function useAdtStore() {
	const dispatch = useDispatch();

	const addFavoritePackageAction = useCallback(
		(favoritePackage: ADTFavoritePackage) => {
			dispatch(addFavoritePackage(favoritePackage));
		},
		[]
	);
	const deleteFavoritePackageAction = useCallback((id: string) => {
		dispatch(deleteFavoritePackage(id));
	}, []);
	const setFavoritePackagesAction = useCallback(
		(favoritePackages: ADTFavoritePackages) => {
			dispatch(setFavoritePackages(favoritePackages));
		},
		[]
	);
	const setFavPackageTreeAttributesAction = useCallback(
		(treeAttributes: TreeAttributes) => {
			dispatch(setFavPackageTreeAttributes(treeAttributes));
		},
		[]
	);

	return {
		addFavoritePackageAction,
		deleteFavoritePackageAction,
		setFavoritePackagesAction,
		setFavPackageTreeAttributesAction,
	};
}
