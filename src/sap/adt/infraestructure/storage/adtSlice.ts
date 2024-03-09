import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import {
	ADTObjectsEditor,
	ADTObjectEditor,
	PackageContentStorage,
	ADTObjectContent,
} from "sap/adt/infraestructure/types/adt";
import { DEFAULT_SIZE_EDITOR_AREA } from "sap/adt/infraestructure/constants/editorConstants";
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";
import { TreeAttributeMap } from "sap/adt/infraestructure/types/tree";

export interface ADTRedux {
	favoritePackages: ADTFavoritePackages;
	objectsEditor: ADTObjectsEditor;
	objectKeyActive: string;
	objectKeyPrevious: string;
	heightEditor: number;
	treeAttributesMap: TreeAttributeMap;
}

const initialState: ADTRedux = {
	favoritePackages: [],
	objectsEditor: [],
	objectKeyActive: "",
	objectKeyPrevious: "",
	heightEditor: DEFAULT_SIZE_EDITOR_AREA.HEIGHT_EDITOR,
	treeAttributesMap: {},
};

export const ADTSlice = createSlice({
	name: "ADT",
	initialState: initialState,
	reducers: {
		addFavoritePackage: (state, action: PayloadAction<ADTFavoritePackage>) => {
			state.favoritePackages.push(action.payload);
		},
		deleteFavoritePackage: (state, action: PayloadAction<string>) => {
			let index = state.favoritePackages.findIndex(
				(row) => row._id == action.payload
			);
			state.favoritePackages.splice(index, index >= 0 ? 1 : 0);
		},
		setFavoritePackages(state, action: PayloadAction<ADTFavoritePackages>) {
			state.favoritePackages = action.payload;
		},
		setLoadingContentPackage(state, action: PayloadAction<string>) {
			let index = state.favoritePackages.findIndex(
				(row) => row.packageName == action.payload
			);
			if (index != -1) {
				state.favoritePackages[index].loadingContent =
					!state.favoritePackages[index].loadingContent;
			}
		},
		setLoadedContentPackage(state, action: PayloadAction<string>) {
			let index = state.favoritePackages.findIndex(
				(row) => row.packageName == action.payload
			);
			if (index != -1)
				state.favoritePackages[index].loadedContent =
					!state.favoritePackages[index].loadedContent;
		},
		setContentPackage(state, action: PayloadAction<PackageContentStorage>) {
			let index = state.favoritePackages.findIndex(
				(row) => row.packageName == action.payload.packageName
			);
			if (index != -1)
				state.favoritePackages[index].content = action.payload.content;
		},
		setLoadingContentObject(state, action: PayloadAction<string>) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload
			);
			if (index != -1)
				state.objectsEditor[index].loadingContent =
					!state.objectsEditor[index].loadingContent;
		},
		setLoadingStructureObject(state, action: PayloadAction<string>) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload
			);
			if (index != -1)
				state.objectsEditor[index].loadingStructure =
					!state.objectsEditor[index].loadingStructure;
		},
		addObjectEditor(state, action: PayloadAction<ADTObjectEditor>) {
			state.objectsEditor.push(action.payload);
		},
		setContentObject(
			state,
			action: PayloadAction<{
				objectKey: string;
				content: ADTObjectContent;
			}>
		) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload.objectKey
			);
			if (index != -1)
				state.objectsEditor[index].objectContent = action.payload.content;
		},
		setObjectStructure(
			state,
			action: PayloadAction<{
				objectKey: string;
				content: ADTObjectStructure;
			}>
		) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload.objectKey
			);
			if (index != -1)
				state.objectsEditor[index].objectStructure = action.payload.content;
		},
		setObjectsEditor(state, action: PayloadAction<ADTObjectsEditor>) {
			state.objectsEditor = action.payload;
		},
		deleteObjectEditor(state, action: PayloadAction<string>) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload
			);

			state.objectsEditor.splice(index, index >= 0 ? 1 : 0);
		},
		updateObjectEditor(state, action: PayloadAction<ADTObjectEditor>) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload.objectKey
			);
			if (index != -1) state.objectsEditor[index] = action.payload;
		},
		setObjectKeyActive(state, action: PayloadAction<string>) {
			state.objectKeyActive = action.payload;
		},
		setObjectKeyPrevious(state, action: PayloadAction<string>) {
			state.objectKeyPrevious = action.payload;
		},

		setSectionSource(
			state,
			action: PayloadAction<{
				objectKey: string;
				sectionSource: string;
			}>
		) {
			let index = state.objectsEditor.findIndex(
				(row) => row.objectKey == action.payload.objectKey
			);
			if (index != -1)
				state.objectsEditor[index].sectionSource = action.payload.sectionSource;
		},
		setHeightEditor(state, action: PayloadAction<number>) {
			state.heightEditor = action.payload;
		},
		setAttributesMap(state, action: PayloadAction<TreeAttributeMap>) {
			state.treeAttributesMap = action.payload;
		},
	},
});

export const {
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
	setObjectsEditor,
	setObjectKeyActive,
	setObjectKeyPrevious,
	setSectionSource,
	updateObjectEditor,
	setHeightEditor,
	setObjectStructure,
	setAttributesMap,
	setLoadingStructureObject,
} = ADTSlice.actions;

export default ADTSlice.reducer;
