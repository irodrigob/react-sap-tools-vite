import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import {
	setObjectsText,
	setObjectsTextOriginal,
	setParamsObjectsTranslate,
	setColumnsObjectsText,
} from "sap/translate/infraestructure/storage/sapTranslateSlice";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";
import { INIT_PARAMS_OBJECT_TRANSLATE } from "sap/translate/infraestructure/utils/initValues";

export default function useSAPTranslateStore() {
	const dispatch = useDispatch();
	const setObjectsTextAction = useCallback((value: ObjectsText) => {
		dispatch(setObjectsText(value));
	}, []);
	const setObjectsTextOriginalAction = useCallback((value: ObjectsText) => {
		dispatch(setObjectsTextOriginal(value));
	}, []);
	const setParamsObjectsTranslateAction = useCallback(
		(value: ParamsObjectTranslate) => {
			dispatch(setParamsObjectsTranslate(value));
		},
		[]
	);
	const setColumnsObjectsTextAction = useCallback(
		(value: AnalyticalTableColumnDefinition[]) => {
			dispatch(setColumnsObjectsText(value));
		},
		[]
	);
	const clearVariables = useCallback(() => {
		setObjectsTextAction([]);
		setObjectsTextOriginalAction([]);
		setParamsObjectsTranslateAction(INIT_PARAMS_OBJECT_TRANSLATE);
	}, []);

	return {
		setObjectsTextAction,
		setObjectsTextOriginalAction,
		setParamsObjectsTranslateAction,
		setColumnsObjectsTextAction,
		clearVariables,
	};
}
