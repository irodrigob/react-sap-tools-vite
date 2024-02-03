import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ADTFavoritePackage,
	ADTFavoritePackages,
} from "sap/adt/domain/entities/favoritePackage";
import { TreeAttributes } from "sap/adt/domain/entities/treeAttributes";

export interface ADTRedux {
	favoritePackages: ADTFavoritePackages;
	favoritePackagesTreeAttributes: TreeAttributes;
}

const initialState: ADTRedux = {
	favoritePackages: [],
	favoritePackagesTreeAttributes: [],
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
		setFavPackageTreeAttributes(state, action: PayloadAction<TreeAttributes>) {
			state.favoritePackagesTreeAttributes = action.payload;
		},
	},
});

export const {
	addFavoritePackage,
	deleteFavoritePackage,
	setFavoritePackages,
	setFavPackageTreeAttributes,
} = ADTSlice.actions;

export default ADTSlice.reducer;
