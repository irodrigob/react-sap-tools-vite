import { useCallback } from "react";
import {
	ObjectsText,
	ReturnRowChanged,
} from "sap/translate/infraestructure/types/translate.d";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";
import { useAppSelector } from "shared/storage/useStore";
import {
	TEXT_PPSAL_TYPE,
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";
import ObjectText from "sap/translate/domain/entities/objectText";

export default function useDataManager() {
	const { objectsText, objectsTextOriginal } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const { setObjectsTextAction } = useSAPTranslateStore();

	/**
	 * Convierte la tabla de textos de los objetos en una tabla con los objetos únicos
	 * @param objectTexts | Array con los objetos
	 * @returns Array con objetos únicos
	 */
	const convertObjectTexts2AddObjects = useCallback(
		(objectTexts: ObjectsText): AddObjects2Order => {
			let tempAddObjects: AddObjects2Order = [];
			objectTexts.forEach((rowOrderText) => {
				if (
					tempAddObjects.findIndex(
						(rowAdd) =>
							rowAdd.object == rowOrderText.object &&
							rowAdd.objName == rowOrderText.objName
					) == -1
				)
					tempAddObjects.push({
						object: rowOrderText.object,
						objName: rowOrderText.objName,
					});
			});
			return tempAddObjects;
		},
		[]
	);

	/**
	 * En base al ID de la columna de la tabla se devuelve el campo que contiene el tipo de
	 * propuesta de texto
	 * @param columnId | Id de columna con el texto
	 * @returns | Nombre de columna de la propuesta de texto
	 */
	const determinePpsalTypeFromColumnId = useCallback((columnId: string) => {
		return columnId.replace(FIELDS_TEXT.TEXT, FIELDS_TEXT.PPSAL_TYPE);
	}, []);
	/**
	 * En base al ID de la columna de la tabla se devuelve el campo que contiene el idioma de destino
	 * @param columnId | Id de columna con el texto
	 * @returns | Nombre de columna de la propuesta de texto
	 */
	const determineColTextFromColumnId = useCallback((columnId: string) => {
		return columnId.replace(FIELDS_TEXT.TEXT, FIELDS_TEXT.COL_TEXT);
	}, []);

	/**
	 * Determina el tipo de propuesta según el valor informado
	 * @param rowData | Fila con los datos
	 * @param columnId | Columna que se modifica
	 * @param rowIndex | Fila que se modifica
	 */
	const determinePpsalTypeFromValue = useCallback(
		(
			rowData: ObjectText,
			columnId: string,
			rowIndex: number
		): typeof TEXT_PPSAL_TYPE => {
			let fieldPpsalType = determinePpsalTypeFromColumnId(columnId);

			return rowData[columnId as keyof ObjectText] !=
				objectsTextOriginal[rowIndex][columnId]
				? TEXT_PPSAL_TYPE.CHANGED_TEXT
				: objectsTextOriginal[rowIndex][fieldPpsalType];
		},
		[objectsTextOriginal]
	);
	/**
	 * Devuelve la fila actualizada cuando se modifica una columna de datos
	 * @param rowChanged | Datos de la fila modificada
	 * @param columnId | Columna modificado
	 * @param value | Valor
	 * @returns Estructura con la fila de los datos maestros ajustado segun el valor introducido
	 * y la posición del array con los textos modificado.
	 */
	const processColumnChanged = useCallback(
		(
			rowChanged: ObjectText,
			columnId: string,
			value: string
		): ReturnRowChanged => {
			let returnData: ReturnRowChanged = {
				rowIndex: -1,
				rowObjectText: undefined,
			};
			let fieldPpsalType = determinePpsalTypeFromColumnId(columnId);

			returnData.rowIndex = objectsText.findIndex(
				(row: ObjectText) =>
					row.object == rowChanged.object &&
					row.objName == rowChanged.objName &&
					row.objType == rowChanged.objType &&
					row.idText == rowChanged.idText
			);
			if (returnData.rowIndex != -1) {
				returnData.rowObjectText = { ...objectsText[returnData.rowIndex] };
				returnData.rowObjectText[columnId] = value;

				// Si hay valor se mira si el valor es el mismo al original. Si es igual se pone el tipo de propuesta original,
				// en caso de no serlo se pone que ha sido modificado.
				returnData.rowObjectText[fieldPpsalType] = determinePpsalTypeFromValue(
					returnData.rowObjectText,
					columnId,
					returnData.rowIndex
				);
			}
			return returnData;
		},
		[objectsText, objectsTextOriginal]
	);
	/**
	 * Proceso que realiza la actualización de los datos tanto en el modelo propio
	 * como en la tabla que guarda los registros que se actualizan
	 * @param rowChanged | Fila modificada
	 * @param columnId | Id de columna modificada
	 * @param value | Valor introducido
	 */
	const updateColumnChanged = useCallback(
		(rowChanged: ObjectText, columnId: string, value: string) => {
			let newObjectsText = structuredClone(objectsText);
			let returnColumnChanged = processColumnChanged(
				rowChanged,
				columnId,
				value
			);

			if (returnColumnChanged.rowIndex != -1) {
				newObjectsText[returnColumnChanged.rowIndex] =
					returnColumnChanged.rowObjectText;
				// Los datos se cambian siempre porque puede haber cambios en el tipo de propuesta, aunque se indique que los valores sean iguales.
				setObjectsTextAction(newObjectsText);
			}
		},
		[objectsTextOriginal, objectsText]
	);

	/**
	 * Mapeo de los objetos de texto del Excel al modelo de datos
	 * @param objectsTextExcel | Array con los objetos de texto del excel
	 * @returns | Booleano que indica si hay errores en los mapeos
	 */
	const mappingObjectsTextExcel2ModelData = useCallback(
		(objectsTextExcel: ObjectsText): boolean => {
			let processError = false;
			let newObjectsText = structuredClone(objectsText);

			objectsTextExcel.forEach((row: ObjectText) => {
				let indexRowNew = newObjectsText.findIndex(
					(rowNew) =>
						rowNew.objName == row.objName &&
						rowNew.object == row.object &&
						rowNew.objType == row.objType &&
						rowNew.idText == row.idText
				);
				if (indexRowNew != -1) {
					for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
						let txtField = `${FIELDS_TEXT.TEXT}${x}`;

						if (
							row[txtField as keyof ObjectText] &&
							row[txtField as keyof ObjectText] != ""
						) {
							try {
								newObjectsText[indexRowNew][txtField as keyof ObjectText] =
									row[txtField as keyof ObjectText];

								newObjectsText[indexRowNew][
									`${FIELDS_TEXT.PPSAL_TYPE}${x}` as keyof ObjectText
								] = determinePpsalTypeFromValue(
									newObjectsText[indexRowNew],
									txtField,
									indexRowNew
								);
							} catch {
								processError = true;
							}
						} else {
							processError = true;
						}
					}
				} else {
					processError = true;
				}
			});

			setObjectsTextAction(newObjectsText);
			return processError;
		},
		[objectsText]
	);

	return {
		convertObjectTexts2AddObjects,
		determinePpsalTypeFromColumnId,
		determineColTextFromColumnId,
		updateColumnChanged,
		mappingObjectsTextExcel2ModelData,
	};
}
