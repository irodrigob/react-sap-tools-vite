export const APP = "TRANSLATE";

// Numero de campo configurados para el idioma destino
export const NUMBER_FIELD_TLANG = 10;
// Tipos de propuesta en los textos provenientes de SAP y propios de la aplicación
export const TEXT_PPSAL_TYPE = {
	// vienen de SAP
	WITHOUT_TEXT: "WT",
	PPSAL_CONFIRMED: "PC",
	PPSAL_WO_CONFIRM: "PW",
	// propios de la aplicación
	CHANGED_TEXT: "CT",
};

export const COLOR_TEXT_PPSAL_TYPE = {
	WITHOUT_TEXT: "var(--sapErrorBorderColor)",
	PPSAL_CONFIRMED: "var(--sapSuccessBorderColor)",
	PPSAL_WO_CONFIRM: "var(--sapWarningBorderColor)",
	CHANGED_TEXT: "var(--sapNeutralBorderColor)",
};

export const FIELDS_TEXT = {
	TEXT: "txtTlang",
	PPSAL_TYPE: "ppsalTypeTlang",
	COL_TEXT: "colTlang",
	LANGUAGE: "langTlang",
	LANG_OLANG: "langOlang",
	COL_OLANG: "colOlang",
	TXT_OLANG: "txtOlang",
};
