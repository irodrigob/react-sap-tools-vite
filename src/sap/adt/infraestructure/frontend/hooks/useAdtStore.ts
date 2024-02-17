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
	addObjectEditor,
	deleteObjectEditor,
	setLoadingObject,
	setContentObject,
	setObjectKeyActive,
	setObjectsEditor,
} from "sap/adt/infraestructure/storage/adtSlice";
import {
	PackageContentStorage,
	ADTObjectEditor,
	ADTObjectInfoEditor,
	ADTObjectContent,
	ADTObjectsEditor,
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
	const addObjectEditorAction = useCallback((objectEditor: ADTObjectEditor) => {
		dispatch(addObjectEditor(objectEditor));
	}, []);
	const deleteObjectEditorAction = useCallback(
		(objectInfo: ADTObjectEditor) => {
			dispatch(deleteObjectEditor(objectInfo));
		},
		[]
	);
	const setLoadingObjectAction = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			dispatch(setLoadingObject(objectInfo));
		},
		[]
	);
	const setContentObjectAction = useCallback(
		(objectInfo: ADTObjectInfoEditor, content: ADTObjectContent) => {
			dispatch(setContentObject({ objectInfo: objectInfo, content: content }));
		},
		[]
	);
	const setObjectsEditorAction = useCallback(
		(objectsEditor: ADTObjectsEditor) => {
			dispatch(setObjectsEditor(objectsEditor));
		},
		[]
	);
	const setObjectKeyActiveAction = useCallback((objectKey: string) => {
		dispatch(setObjectKeyActive(objectKey));
	}, []);
	const clearVariables = useCallback(() => {
		setFavoritePackagesAction([]);
		setObjectsEditorAction([]);
		setObjectKeyActiveAction("");
	}, []);

	return {
		addFavoritePackageAction,
		deleteFavoritePackageAction,
		setFavoritePackagesAction,
		setLoadingContentPackageAction,
		setContentPackageAction,
		setLoadedContentPackageAction,
		clearVariables,
		addObjectEditorAction,
		deleteObjectEditorAction,
		setLoadingObjectAction,
		setContentObjectAction,
		setObjectKeyActiveAction,
		setObjectsEditorAction,
	};
}
