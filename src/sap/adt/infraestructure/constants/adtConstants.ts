export const ADT_OBJECT_TYPES = {
	CLASSES: {
		OBJECT_TYPE: "CLAS",
		EDITOR: {
			DEFAULT_SECTION: "globalClass",
			SECTION_SOURCES: [
				{
					SECTION: "globalClass",
					LABEL: "adtIde.editor.classes.tabGlobalClass",
					SOURCE_URI: "source/main",
				},
				{
					SECTION: "localClassTypes",
					LABEL: "adtIde.editor.classes.tabClassLocalTypes",
					SOURCE_URI: "includes/definitions",
				},
				{
					SECTION: "localClass",
					LABEL: "adtIde.editor.classes.tabClassLocal",
					SOURCE_URI: "includes/implementations",
				},
				{
					SECTION: "testClass",
					LABEL: "adtIde.editor.classes.tabTestClasses",
					SOURCE_URI: "",
				},
				{
					SECTION: "macros",
					LABEL: "adtIde.editor.classes.tabMacros",
					SOURCE_URI: "includes/macros",
				},
			],
		},
	},
	PACKAGES: {
		OBJECT_TYPE: "DEVC",
	},
};

// Categorias que se tiene que enseñar directamente la lista de objetos
export const CATEGORIES_SHOW_OBJECTLIST = ["message_classes", "transactions"];

// Tipos de objeto con el editor desarrollado
export const OBJECTTYPES_DEVELOP_EDIT = ["CLAS/OC"];
