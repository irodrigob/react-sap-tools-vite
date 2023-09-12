export const APP = "TRANSLATE";

// Numero de campo configurados para el idioma destino
export const NUMBER_FIELD_TLANG = 10;
// Tipos de propuesta en los textos provenientes de SAP
export const TEXT_PPSAL_TYPE = {
	WITHOUT_TEXT: "WT",
	PPSAL_CONFIRMED: "PC",
	PPSAL_WO_CONFIRM: "PW",
};

export const COLOR_TEXT_PPSAL_TYPE = {
	WITHOUT_TEXT: "var(--sapErrorBorderColor)",
	PPSAL_CONFIRMED: "var(--sapSuccessBorderColor)",
	PPSAL_WO_CONFIRM: "var(--sapWarningBorderColor)",
};

export const FIELDS_TEXT = {
	TEXT: "txtTlang",
	PPSAL_TYPE: "ppsalTypeTlang",
	COL_TEXT: "colTlang",
};
