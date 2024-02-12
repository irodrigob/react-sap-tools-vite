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
	setLoadingContentPackage,
	setContentPackage,
	setLoadedContentPackage,
	addObjectOpenEditor,
	deleteObjectOpenEditor,
} from "sap/adt/infraestructure/storage/adtSlice";
import {
	PackageContentStorage,
	ADTObjectTypesOpenEditor,
	ADTObjectTypeOpenEditor,
} from "sap/adt/infraestructure/types/adt";

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
	const setLoadingContentPackageAction = useCallback((packageName: string) => {
		dispatch(setLoadingContentPackage(packageName));
	}, []);
	const setContentPackageAction = useCallback(
		(packageContent: PackageContentStorage) => {
			dispatch(setContentPackage(packageContent));
		},
		[]
	);
	const setLoadedContentPackageAction = useCallback((packageName: string) => {
		dispatch(setLoadedContentPackage(packageName));
	}, []);
	const addObjectTypeInEditorAction = useCallback(
		(objectTypeEditor: ADTObjectTypeOpenEditor) => {
			dispatch(addObjectOpenEditor(objectTypeEditor));
		},
		[]
	);
	const deleteObjectTypeInEditorAction = useCallback(
		(objectTypeEditor: ADTObjectTypeOpenEditor) => {
			dispatch(deleteObjectOpenEditor(objectTypeEditor));
		},
		[]
	);
	const clearVariables = useCallback(() => {
		setFavoritePackagesAction([]);
	}, []);

	return {
		addFavoritePackageAction,
		deleteFavoritePackageAction,
		setFavoritePackagesAction,
		setLoadingContentPackageAction,
		setContentPackageAction,
		setLoadedContentPackageAction,
		clearVariables,
		addObjectTypeInEditorAction,
		deleteObjectTypeInEditorAction,
	};
}
