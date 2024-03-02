import { ADTObjectEditor } from "sap/adt/infraestructure/types/adt";

export const INIT_OBJECT_EDITOR: ADTObjectEditor = {
	loadingContent: false,
	objectInfo: {
		category: "",
		object: { objectName: "", objectUri: "", techName: "" },
		objectType: "",
		objectTypeDesc: "",
		packageName: "",
	},
	objectKey: "",
};
