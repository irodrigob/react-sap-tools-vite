import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import {
	ADTObjectsEditor,
	ADTObjectEditor,
	PackageContentStorage,
	ADTObjectInfoEditor,
	ADTObjectContent,
} from "sap/adt/infraestructure/types/adt";

export interface ADTRedux {
	favoritePackages: ADTFavoritePackages;
	objectsEditor: ADTObjectsEditor;
	objectKeyActive: string;
	objectKeyPrevious: string;
}

const initialState: ADTRedux = {
	favoritePackages: [],
	objectsEditor: [],
	objectKeyActive: "",
	objectKeyPrevious: "",
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
		setContentPackage(state, action: PayloadAction<PackageContentStorage>) {
			let index = state.favoritePackages.findIndex(
				(row) => row.packageName == action.payload.packageName
			);
			if (index != -1)
				state.favoritePackages[index].content = action.payload.content;
		},
		setLoadedContentPackage(state, action: PayloadAction<string>) {
			let index = state.favoritePackages.findIndex(
				(row) => row.packageName == action.payload
			);
			if (index != -1)
				state.favoritePackages[index].loadedContent =
					!state.favoritePackages[index].loadedContent;
		},
		addObjectEditor(state, action: PayloadAction<ADTObjectEditor>) {
			state.objectsEditor.push(action.payload);
		},
		setLoadingObject(state, action: PayloadAction<ADTObjectInfoEditor>) {
			let index = state.objectsEditor.findIndex(
				(row) =>
					row.objectInfo.packageName == action.payload.packageName &&
					row.objectInfo.category == action.payload.category &&
					row.objectInfo.objectType == action.payload.objectType &&
					row.objectInfo.object.objectName == action.payload.object.objectName
			);
			if (index != -1)
				state.objectsEditor[index].loadingContent =
					!state.objectsEditor[index].loadingContent;
		},
		setContentObject(
			state,
			action: PayloadAction<{
				objectInfo: ADTObjectInfoEditor;
				content: ADTObjectContent;
			}>
		) {
			let index = state.objectsEditor.findIndex(
				(row) =>
					row.objectInfo.packageName == action.payload.objectInfo.packageName &&
					row.objectInfo.category == action.payload.objectInfo.category &&
					row.objectInfo.objectType == action.payload.objectInfo.objectType &&
					row.objectInfo.object.objectName ==
						action.payload.objectInfo.object.objectName
			);
			if (index != -1)
				state.objectsEditor[index].objectContent = action.payload.content;
		},
		setObjectsEditor(state, action: PayloadAction<ADTObjectsEditor>) {
			state.objectsEditor = action.payload;
		},
		deleteObjectEditor(state, action: PayloadAction<ADTObjectInfoEditor>) {
			let index = state.objectsEditor.findIndex(
				(row) =>
					row.objectInfo.packageName == action.payload.packageName &&
					row.objectInfo.category == action.payload.category &&
					row.objectInfo.objectType == action.payload.objectType &&
					row.objectInfo.object.objectName == action.payload.object.objectName
			);

			state.objectsEditor.splice(index, index >= 0 ? 1 : 0);
		},
		setObjectKeyActive(state, action: PayloadAction<string>) {
			// Me quedo con el valor previo
			state.objectKeyPrevious = state.objectKeyActive;

			state.objectKeyActive = action.payload;
		},
		setObjectKeyPrevious(state, action: PayloadAction<string>) {
			state.objectKeyPrevious = action.payload;
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
	setLoadingObject,
	setContentObject,
	setObjectsEditor,
	setObjectKeyActive,
	setObjectKeyPrevious,
} = ADTSlice.actions;

export default ADTSlice.reducer;
