import AppStore from "shared/storage/appStore";
import {
	setObjectsText,
	setObjectsTextOriginal,
	setParamsObjectsTranslate,
} from "./sapTranslateSlice";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate";

export default class SAPTranslateActions extends AppStore {
	setObjectsText(value: ObjectsText) {
		this.dispatch(setObjectsText(value));
	}
	setObjectsTextOriginal(value: ObjectsText) {
		this.dispatch(setObjectsTextOriginal(value));
	}
	setParamsObjectsTranslate(value: ParamsObjectTranslate) {
		this.dispatch(setParamsObjectsTranslate(value));
	}
}
