import { useCallback } from "react";
import XLSX from "sheetjs-style-v2";
import ObjectText from "sap/translate/domain/entities/objectText";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import {
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";
import { useTranslations } from "translations/i18nContext";
import FileAs from "shared/utils/file/fileAs";

export default function useExcelManager() {
	const { getI18nText } = useTranslations();

	/**
	 * Construye la cabecera que usará la libreria para mapear los campos de la tabla
	 * @param objetText | Fila de datos para poder determinar los campos que se isam
	 * @returns Array con los campos de la cabecera
	 */
	const buildHeader = useCallback((objectText: ObjectText): string[] => {
		// Campos fijos que tienen que aparecer
		let fields: string[] = [
			"object",
			"objName",
			"objType",
			"idText",
			FIELDS_TEXT.TXT_OLANG,
		];

		// Campos de texto de destino si hay idioma destino informado
		for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
			let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;
			if (objectText[langField as keyof ObjectText] == "") break;
			else fields.push(`${FIELDS_TEXT.TEXT}${x}`);
		}

		return fields;
	}, []);
	/**
	 * Construye el registro con las descripciones de los campos
	 * @param objectText | Primer registro de datos donde ya hay las descripciones de las columnas
	 * @returns | Registro con las descripciones de las columnas
	 */
	const buildRowDescriptions = useCallback(
		(objectText: ObjectText): ObjectText => {
			// Tomo como base el registro donde
			let rowDescription = { ...objectText };

			rowDescription.object = rowDescription.objName = getI18nText(
				"translate.objectsTextTable.lblObject"
			);
			rowDescription.objType = getI18nText(
				"translate.objectsTextTable.lblObjtype"
			);
			rowDescription.objName = getI18nText(
				"translate.objectsTextTable.lblObjectName"
			);
			rowDescription.idText = getI18nText(
				"translate.objectsTextTable.lblIdText"
			);
			// El valor de colOlang que es donde esta la descripción del idioma la pongo donde sale el texto
			rowDescription.txtOlang = rowDescription.colOlang;

			// Los campos de destino se hace lo mismo que en el origen. Se pone el texto del idioma destino en la columna del texto del id de objeto
			for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
				let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;

				if (rowDescription[langField as keyof ObjectText] != "") {
					let colField = `${FIELDS_TEXT.COL_TEXT}${x}`;
					let textField = `${FIELDS_TEXT.TEXT}${x}`;

					rowDescription[textField as keyof ObjectText] = rowDescription[
						colField as keyof ObjectText
					] as string;
				} else {
					break;
				}
			}

			return rowDescription;
		},
		[]
	);
	/**
	 * Oculta la fila con los campos técnicos que añade de manera automática
	 * la librería.
	 * @param ws | Objeto con la worksheet
	 */
	const hiddenTechnicalRow = useCallback((ws: XLSX.WorkSheet) => {
		if (!ws["!rows"]) ws["!rows"] = [];

		// Se añade un metadata a la fila para que luego funciona el ocultar la fila
		if (!ws["!rows"][0]) ws["!rows"][0] = { hpx: 20 };

		ws["!rows"][0].hidden = true;
	}, []);

	/**
	 * Oculta la columna pasada por parámetro
	 * @param colIndex | Número de columna
	 * @param ws | Worksheet del excel
	 */
	const hiddeColumn = useCallback((colIndex: number, ws: XLSX.WorkSheet) => {
		if (!ws["!cols"]) ws["!cols"] = [];

		// A la columna hay que añadir un metadata para que funcione el ocultar
		if (!ws["!cols"][colIndex]) ws["!cols"][colIndex] = { wch: 8 };

		ws["!cols"][colIndex].hidden = true;
	}, []);

	/**
	 * Oculta las columnas técnicas de los textos necesarias para el montaje de la tabla
	 * y grabación de datos pero que no tiene sentido que se visualicen
	 * @param ws
	 * @param objectText
	 */
	const hiddenTechnicalColumns = useCallback(
		(ws: XLSX.WorkSheet, objectText: ObjectText) => {
			let fieldsKeys = Object.keys(objectText);

			// La primera pasada se ocultan campos fijos: id del idioma origen, texto del idioma origen, id e descripcion de los idioma de destino y el tipo
			// de propuesta de texto
			fieldsKeys.forEach((field, key) => {
				if (
					field == FIELDS_TEXT.COL_OLANG ||
					field == FIELDS_TEXT.LANG_OLANG ||
					field.includes(FIELDS_TEXT.COL_TEXT) ||
					field.includes(FIELDS_TEXT.PPSAL_TYPE) ||
					field.includes(FIELDS_TEXT.LANGUAGE)
				) {
					hiddeColumn(key, ws);
				}
			});
			// La segunda pasada es para ocultar los campos de texto de idioma destino que no tienen idioma asociado
			for (let x = 1; x <= 10; x++) {
				let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;

				if (objectText[langField as keyof ObjectText] == "") {
					let textField = `${FIELDS_TEXT.TEXT}${x}`;
					let colIndex = fieldsKeys.findIndex((row) => row == textField);
					if (colIndex != -1) hiddeColumn(colIndex, ws);
				} else {
					break;
				}
			}
		},
		[]
	);

	const generateExcel = (objectsText: ObjectsText) => {
		let newObjectText: ObjectsText = [];

		let headerFields = buildHeader(objectsText[0]);
		console.log(headerFields);

		newObjectText.push(buildRowDescriptions(objectsText[0]));
		newObjectText = newObjectText.concat(objectsText);

		let ws = XLSX.utils.json_to_sheet(newObjectText, {
			header: headerFields,
		});

		let wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

		//hiddenTechnicalRow(ws);
		//hiddenTechnicalColumns(ws, objectsText[0]);

		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		FileAs.save(
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
			"prueba.xlsx",
			excelBuffer
		);
	};

	return { generateExcel };
}
