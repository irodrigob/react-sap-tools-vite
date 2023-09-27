import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import { INIT_PARAMS_OBJECT_TRANSLATE } from "sap/translate/infraestructure/utils/initValues";

export interface SAPTranslateRedux {
	objectsText: ObjectsText;
	objectsTextOriginal: ObjectsText;
	paramsObjectsTranslate: ParamsObjectTranslate;
	columnsObjectsText: AnalyticalTableColumnDefinition[];
}

const initialState: SAPTranslateRedux = {
	objectsText: [],
	objectsTextOriginal: [],
	paramsObjectsTranslate: INIT_PARAMS_OBJECT_TRANSLATE,
	columnsObjectsText: [],
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
		setColumnsObjectsText: (
			state,
			action: PayloadAction<AnalyticalTableColumnDefinition[]>
		) => {
			state.columnsObjectsText = action.payload;
		},
	},
});

export const {
	setObjectsText,
	setObjectsTextOriginal,
	setParamsObjectsTranslate,
	setColumnsObjectsText,
} = SAPTransportOrderSlice.actions;

export default SAPTransportOrderSlice.reducer;
