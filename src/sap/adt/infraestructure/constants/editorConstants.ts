import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export const INIT_OBJECT_EDITOR: ADTObjectEditor = {
	loadingContent: false,
	loadingStructure: false,
	objectInfo: {
		category: "",
		object: { objectName: "", objectUri: "", techName: "" },
		objectType: "",
		objectTypeDesc: "",
		packageName: "",
	},
	objectKey: "",
};

export const DEFAULT_SIZE_EDITOR_AREA = {
	PANEL_EDITOR: 80,
	PANEL_STATUS: 20,
	HEIGHT_EDITOR: 69,
};
