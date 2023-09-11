import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";

export interface SAPTranslateRedux {
	objectsTextsChanged: ObjectsText;
	objectsText: ObjectsText;
	objectsTextsOriginal: ObjectsText;
	paramsObjectsTranslate: ParamsObjectTranslate;
}

const initialState: SAPTranslateRedux = {
	objectsTextsChanged: [],
	objectsText: [],
	objectsTextsOriginal: [],
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
			state.objectsTextsChanged = action.payload;
		},
		setObjectsText: (state, action: PayloadAction<ObjectsText>) => {
			state.objectsText = action.payload;
		},
		setObjectsTextOriginal: (state, action: PayloadAction<ObjectsText>) => {
			state.objectsTextsOriginal = action.payload;
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
