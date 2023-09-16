import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import { INIT_PARAMS_OBJECT_TRANSLATE } from "sap/translate/infraestructure/utils/initValues";

export interface SAPTranslateRedux {
	objectsText: ObjectsText;
	objectsTextOriginal: ObjectsText;
	paramsObjectsTranslate: ParamsObjectTranslate;
}

const initialState: SAPTranslateRedux = {
	objectsText: [],
	objectsTextOriginal: [],
	paramsObjectsTranslate: INIT_PARAMS_OBJECT_TRANSLATE,
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
