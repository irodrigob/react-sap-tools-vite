import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";

export interface SAPTranslateRedux {
	objectsText: ObjectsText;
	objectsTextOriginal: ObjectsText;
	paramsObjectsTranslate: ParamsObjectTranslate;
}

const initialState: SAPTranslateRedux = {
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
	setObjectsText,
	setObjectsTextOriginal,
	setParamsObjectsTranslate,
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
