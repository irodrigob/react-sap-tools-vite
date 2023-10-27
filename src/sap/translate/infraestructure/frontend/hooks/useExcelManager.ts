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

interface FieldContentMaxLenght {
	[key: string]: number;
}

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
	 * Formateo de la fila de descripciones
	 * @param ws | Objeto con la worksheet
	 */
	const formatterRowDescription = useCallback((ws: XLSX.WorkSheet) => {
		let cellFormat = {
			fill: { fgColor: { rgb: "ff808080", patternType: "solid" } },
			font: { bold: true, color: { rgb: "ffffffff" } },
		};
		ws["A2"].s = cellFormat;
		ws["B2"].s = cellFormat;
		ws["C2"].s = cellFormat;
		ws["D2"].s = cellFormat;
		ws["E2"].s = cellFormat;
		ws["F2"].s = cellFormat;
	}, []);
	/**
	 * Formateo la celda de datos que no se tienen que modificar
	 * @param ws
	 * @param numRowData
	 */
	const formatterFixCellData = (ws: XLSX.WorkSheet, numRowData: number) => {
		// Formato general a todas las celdas
		let cellFormat = {
			fill: { fgColor: { rgb: "ffbfbfbf", patternType: "solid" } },
		};

		// La fila del excel de datos comienza en la 3 (la primera los campos técnicos,ocultos, la segunda las descripciones de los campos)
		for (let x = 0, excelRow = 2; x < numRowData; x++, excelRow++) {
			for (let excelCol = 0; excelCol < 5; excelCol++) {
				let cellAddr = XLSX.utils.encode_cell({ r: excelRow, c: excelCol });
				ws[cellAddr].s = cellFormat;
			}
		}
	};
	/**
	 * Formateo de la hoja excel
	 * @param ws | Objeto con la worksheet
	 * @param numRowData | Numero de registros de datos
	 */
	const formatterWorksheet = useCallback(
		(ws: XLSX.WorkSheet, numRowData: number) => {
			// Formateo de la fila de las descripciones de los campos
			formatterRowDescription(ws);

			// Formateo de las celdas de datos fijos
			formatterFixCellData(ws, numRowData);
		},
		[]
	);
	/**
	 * Ajusta el tamaño de las columnas que se visualizan datos
	 * @param ws | Objeto con la worksheet
	 * @param objectsText | Textos con los objetos
	 */
	const setOptimizeWidthColumns = useCallback(
		(ws: XLSX.WorkSheet, objectsText: ObjectsText) => {
			let maxLength = calculateMaxLengthColumn(objectsText);
			Object.keys(maxLength).forEach((key, index) => {
				setWidthColumn(index, ws, maxLength[key] * 8);
			});
		},
		[]
	);
	const calculateMaxLengthColumn = (
		objectsText: ObjectsText
	): FieldContentMaxLenght => {
		let response: FieldContentMaxLenght = {};

		response["object"] = 0;
		response["objName"] = 0;
		response["objType"] = 0;
		response["idText"] = 0;
		response["txtOlang"] = 0;

		objectsText.forEach((objectText: ObjectText) => {
			if (objectText.object.length > response["object"])
				response["object"] = objectText.object.length;
			if (objectText.objName.length > response["objName"])
				response["objName"] = objectText.objName.length;
			if (objectText.objType.length > response["objType"])
				response["objType"] = objectText.objType.length;
			if (objectText.idText.length > response["idText"])
				response["idText"] = objectText.idText.length;
			if (objectText.txtOlang.length > response["txtOlang"])
				response["txtOlang"] = objectText.txtOlang.length;

			for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
				let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;

				if (objectText[langField as keyof ObjectText] != "") {
					let colField = `${FIELDS_TEXT.TEXT}${x}`;

					if (
						response[colField] &&
						response[colField] < objectText[colField as keyof ObjectText].length
					)
						response[colField] =
							objectText[colField as keyof ObjectText].length;
					else if (!response[colField])
						response[colField] =
							objectText[colField as keyof ObjectText].length;
				} else {
					break;
				}
			}
		});

		return response;
	};

	/**
	 * Oculta la columna pasada por parámetro
	 * @param colIndex | Número de columna
	 * @param ws | Worksheet del excel
	 */
	const hiddeColumn = useCallback((colIndex: number, ws: XLSX.WorkSheet) => {
		if (!ws["!cols"]) ws["!cols"] = [];

		// A la columna hay que añadir un metadata para que funcione el ocultar
		if (!ws["!cols"][colIndex]) ws["!cols"][colIndex] = { wch: 30 };

		ws["!cols"][colIndex].hidden = true;
	}, []);

	/**
	 * Establece el ancho de la columna pasada por parámetro
	 * @param colIndex | Número de columna
	 * @param ws | Worksheet del excel
	 * @param width | Ancho
	 */
	const setWidthColumn = useCallback(
		(colIndex: number, ws: XLSX.WorkSheet, width: number) => {
			if (!ws["!cols"]) ws["!cols"] = [];

			ws["!cols"][colIndex] = { wpx: width };
		},
		[]
	);

	/**
	 * Genera el excel en base a los datos pasados
	 * @param objectsText | Textos de los objetos
	 * @param fileName | Nombre del fichero a generar
	 */
	const generateExcel = useCallback(
		(objectsText: ObjectsText, fileName: string) => {
			let aoa: string[][] = [];

			aoa.push(buildHeader(objectsText[0]));
			aoa.push(buildRowDescriptions(objectsText[0]));
			aoa = aoa.concat(convertData2AOA(objectsText));

			let ws = XLSX.utils.aoa_to_sheet(aoa);

			let wb = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(wb, ws, "Translate");

			hiddenTechnicalRow(ws);
			formatterWorksheet(ws, objectsText.length);
			setOptimizeWidthColumns(ws, objectsText);

			const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
			FileAs.save(
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
				fileName,
				excelBuffer
			);
		},
		[]
	);
	/**
	 * Convierte el formato del fichero leido al formato del dominio
	 * @param objectFile | Array con el contenido del fichero
	 * @returns | Array con el formato ObjectsText
	 */
	const convertJFileObject2ObjectText = (objectFile: any): ObjectsText => {
		let objectsTextExcel: ObjectsText = [];

		// Se inicia en la fila 1 ya que la 0 es el texto de la cabecerta
		for (let x = 1; x < objectFile.length; x++) {
			let rowObjectText: Partial<ObjectText> = {};
			Object.keys(objectFile[x]).forEach((key) => {
				// Nota: Si
				rowObjectText[key as keyof ObjectText] = objectFile[x][key];
			});
			objectsTextExcel.push(rowObjectText as ObjectText);
		}

		return objectsTextExcel;
	};
	/**
	 * Procesa el fichero pasado por parámetro y lo devuelve en formato de la entidad ObjectText
	 * @param contentFile | Contenido del fichero
	 * @returns
	 */
	const processExcelFile = (contentFile: Uint8Array): ObjectsText => {
		const wb = XLSX.read(contentFile, { type: "array" });
		const ws = wb.Sheets[wb.SheetNames[0]];
		// Esta utilidad crea un JSON con los campos de la primera fila. Si alguien cambia dicha fila
		// el json saldrá con campos incorrectos. Cuando se convierta el JSON al array de tipo ObjectsText
		// los campo se mapearán bien.
		const jsonExcel = XLSX.utils.sheet_to_json(ws);

		return convertJFileObject2ObjectText(jsonExcel);
	};

	return { generateExcel, processExcelFile };
}
