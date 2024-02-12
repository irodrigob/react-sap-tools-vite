import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import {
	ADTObjectTypesOpenEditor,
	ADTObjectTypeOpenEditor,
	PackageContentStorage,
} from "sap/adt/infraestructure/types/adt";

export interface ADTRedux {
	favoritePackages: ADTFavoritePackages;
	objectOpenEditor: ADTObjectTypesOpenEditor;
}

const initialState: ADTRedux = {
	favoritePackages: [],
	objectOpenEditor: [],
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
		addObjectOpenEditor(state, action: PayloadAction<ADTObjectTypeOpenEditor>) {
			state.objectOpenEditor.push(action.payload);
		},
		deleteObjectOpenEditor(
			state,
			action: PayloadAction<ADTObjectTypeOpenEditor>
		) {
			let index = state.objectOpenEditor.findIndex(
				(row) =>
					row.packageName == action.payload.packageName &&
					row.category == action.payload.category &&
					row.objectType == action.payload.objectType &&
					row.object.objectName == action.payload.object.objectName
			);
			state.objectOpenEditor.splice(index, index >= 0 ? 1 : 0);
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
	addObjectOpenEditor,
	deleteObjectOpenEditor,
} = ADTSlice.actions;

export default ADTSlice.reducer;
