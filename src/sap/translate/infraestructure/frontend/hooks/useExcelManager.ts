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
		(objectText: ObjectText): string[] => {
			// Tomo como base el registro donde
			let descriptions: string[] = [];

			descriptions.push(getI18nText("translate.objectsTextTable.lblObject"));
			descriptions.push(getI18nText("translate.objectsTextTable.lblObjtype"));
			descriptions.push(
				getI18nText("translate.objectsTextTable.lblObjectName")
			);
			descriptions.push(getI18nText("translate.objectsTextTable.lblIdText"));
			descriptions.push(objectText.colOlang);

			// Los campos de destino se hace lo mismo que en el origen. Se pone el texto del idioma destino en la columna del texto del id de objeto
			for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
				let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;

				if (objectText[langField as keyof ObjectText] != "") {
					let colField = `${FIELDS_TEXT.COL_TEXT}${x}`;
					let textField = `${FIELDS_TEXT.TEXT}${x}`;

					descriptions.push(objectText[colField as keyof ObjectText] as string);
				} else {
					break;
				}
			}

			return descriptions;
		},
		[]
	);
	/**
	 * Convierte los datos de texto a formato AOA
	 * @param objectsText | Datos de texto
	 * @returns Array of object
	 */
	const convertData2AOA = useCallback(
		(objectsText: ObjectsText): string[][] => {
			let dataAOA: string[][] = [];

			objectsText.forEach((row: ObjectText) => {
				let values: string[] = [];

				values.push(row.object);
				values.push(row.objName);
				values.push(row.objType);
				values.push(row.idText);
				values.push(row.txtOlang);
				for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
					let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;

					if (row[langField as keyof ObjectText] != "") {
						let colField = `${FIELDS_TEXT.TEXT}${x}`;

						values.push(row[colField as keyof ObjectText] as string);
					} else {
						break;
					}
				}
				dataAOA.push(values);
			});
			return dataAOA;
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

	const generateExcel = (objectsText: ObjectsText, fileName: string) => {
		let aoa: string[][] = [];

		aoa.push(buildHeader(objectsText[0]));
		aoa.push(buildRowDescriptions(objectsText[0]));
		aoa = aoa.concat(convertData2AOA(objectsText));

		let ws = XLSX.utils.aoa_to_sheet(aoa);

		let wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, "Translate");

		hiddenTechnicalRow(ws);

		const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
		FileAs.save(
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
			fileName,
			excelBuffer
		);
	};

	return { generateExcel };
}
