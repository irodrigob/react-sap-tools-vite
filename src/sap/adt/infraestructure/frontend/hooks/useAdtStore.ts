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
	setLoadingContentObject,
	setContentObject,
	setObjectKeyActive,
	setObjectsEditor,
	setObjectKeyPrevious,
	setSectionSource,
	updateObjectEditor,
	setHeightEditor,
	setObjectStructure,
	setAttributesMap,
	setLoadingStructureObject,
	setObjectCheckRun,
	setRepositoryCheckRun,
} from "sap/adt/infraestructure/storage/adtSlice";
import {
	PackageContentStorage,
	ADTObjectEditor,
	ADTObjectContent,
	ADTObjectsEditor,
} from "sap/adt/infraestructure/types/adt";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";
import { ADTObjectCheckRun } from "sap/adt/domain/entities/objectCheckRun";
import { ADTRepositoryCheckRuns } from "sap/adt/domain/entities/repositoryCheckRun";

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
	const deleteObjectEditorAction = useCallback((objectKey: string) => {
		dispatch(deleteObjectEditor(objectKey));
	}, []);
	const setLoadingContentObjectAction = useCallback((objectKey: string) => {
		dispatch(setLoadingContentObject(objectKey));
	}, []);
	const setObjectContentAction = useCallback(
		(objectKey: string, content: ADTObjectContent) => {
			dispatch(setContentObject({ objectKey: objectKey, content: content }));
		},
		[]
	);
	const setObjectStructureAction = useCallback(
		(objectKey: string, content: ADTObjectStructure) => {
			dispatch(setObjectStructure({ objectKey: objectKey, content: content }));
		},
		[]
	);
	const setObjectCheckRunAction = useCallback(
		(objectKey: string, content: ADTObjectCheckRun) => {
			dispatch(setObjectCheckRun({ objectKey: objectKey, content: content }));
		},
		[]
	);
	const setLoadingStructureObjectAction = useCallback((objectKey: string) => {
		dispatch(setLoadingStructureObject(objectKey));
	}, []);
	const setObjectsEditorAction = useCallback(
		(objectsEditor: ADTObjectsEditor) => {
			dispatch(setObjectsEditor(objectsEditor));
		},
		[]
	);
	const setObjectKeyActiveAction = useCallback((objectKey: string) => {
		dispatch(setObjectKeyActive(objectKey));
	}, []);
	const setObjectKeyPreviousAction = useCallback((objectKey: string) => {
		dispatch(setObjectKeyPrevious(objectKey));
	}, []);
	const setSectionSourceAction = useCallback(
		(objectKey: string, sectionSource: string) => {
			dispatch(setSectionSource({ objectKey, sectionSource }));
		},
		[]
	);
	const updateObjectEditorAction = useCallback(
		(objectEditor: ADTObjectEditor) => {
			dispatch(updateObjectEditor(objectEditor));
		},
		[]
	);
	const setHeightEditorAction = useCallback((size: number) => {
		dispatch(setHeightEditor(size));
	}, []);
	const setAttributesMapAction = useCallback(
		(treeAttributes: TreeAttributeMap) => {
			dispatch(setAttributesMap(treeAttributes));
		},
		[]
	);
	const setRepositoryCheckRunsAction = useCallback(
		(repository: ADTRepositoryCheckRuns) => {
			dispatch(setRepositoryCheckRun(repository));
		},
		[]
	);
	const clearVariables = useCallback(() => {
		setFavoritePackagesAction([]);
		setObjectsEditorAction([]);
		setObjectKeyActiveAction("");
		setRepositoryCheckRunsAction([]);
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
		setLoadingContentObjectAction,
		setObjectContentAction,
		setObjectKeyActiveAction,
		setObjectsEditorAction,
		setObjectKeyPreviousAction,
		setSectionSourceAction,
		updateObjectEditorAction,
		setHeightEditorAction,
		setObjectStructureAction,
		setAttributesMapAction,
		setLoadingStructureObjectAction,
		setObjectCheckRunAction,
		setRepositoryCheckRunsAction,
	};
}
