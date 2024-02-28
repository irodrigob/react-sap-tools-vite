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

export const CLASS_DEFAULT_SECTION = "globalClass";
export const CLASS_SECTION_SOURCE: Record<string, string> = {
	globalClass: "adtIde.editor.classes.tabGlobalClass",
	localClass: "adtIde.editor.classes.tabClassLocal",
	testClass: "adtIde.editor.classes.tabTestClasses",
	macros: "adtIde.editor.classes.tabMacros",
};
