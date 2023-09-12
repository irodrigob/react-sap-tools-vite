import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";

export interface SAPTranslateRedux {
	objectsTextChanged: ObjectsText;
	objectsText: ObjectsText;
	objectsTextOriginal: ObjectsText;
	paramsObjectsTranslate: ParamsObjectTranslate;
}

const initialState: SAPTranslateRedux = {
	objectsTextChanged: [],
	objectsText: [],
	objectsTextOriginal: [],
	paramsObjectsTranslate: {
		depthRefs: 1,
		object: "PROG",
		objectName: "ZTRANSLATE_TOOL",
		oLang: "EN",
		order: "",
		tLang: [],
	},
};

export const SAPTransportOrderSlice = createSlice({
	name: "SAPTranslate",
	initialState: initialState,
	reducers: {
		setObjectsTextChanged: (state, action: PayloadAction<ObjectsText>) => {
			state.objectsTextChanged = action.payload;
		},
		setObjectsText: (state, action: PayloadAction<ObjectsText>) => {
			state.objectsText = action.payload;
		},
		setObjectsTextOriginal: (state, action: PayloadAction<ObjectsText>) => {
			state.objectsTextOriginal = action.payload;
		},
		setParamsObjectsTranslate: (
			state,
			action: PayloadAction<ParamsObjectTranslate>
		) => {
			state.paramsObjectsTranslate = action.payload;
		},
	},
});

export const {
	setObjectsTextChanged,
	setObjectsText,
	setObjectsTextOriginal,
	setParamsObjectsTranslate,
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
