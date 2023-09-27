import { useCallback } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { AddObjects2Order } from "sap/translate/infraestructure/dto/addObjects2Order";
import { useAppSelector } from "shared/storage/useStore";
import {
	TEXT_PPSAL_TYPE,
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import ObjectText from "sap/translate/domain/entities/objectText";

export default function useDataManager() {
	const { objectsText, objectsTextOriginal } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const translateActions = new SAPTranslateActions();

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
	 * Proceso que realiza la actualización de los datos tanto en el modelo propio
	 * como en la tabla que guarda los registros que se actualizan
	 * @param rowChanged | Fila modificada
	 * @param columnId | Id de columna modificada
	 * @param value | Valor introducido
	 */
	const processRowChanged = useCallback(
		(rowChanged: ObjectText, columnId: string, value: string) => {
			let newObjectsText = structuredClone(objectsText);
			let fieldPpsalType = determinePpsalTypeFromColumnId(columnId);

			let rowObjectIndex = newObjectsText.findIndex(
				(row: ObjectText) =>
					row.object == rowChanged.object &&
					row.objName == rowChanged.objName &&
					row.objType == rowChanged.objType &&
					row.idText == rowChanged.idText
			);

			newObjectsText[rowObjectIndex][columnId] = value;

			// Si hay valor se mira si el valor es el mismo al original. Si es igual se pone el tipo de propuesta original,
			// en caso de no serlo se pone que ha sido modificado.
			newObjectsText[rowObjectIndex][fieldPpsalType] =
				newObjectsText[rowObjectIndex][columnId] !=
				objectsTextOriginal[rowObjectIndex][columnId]
					? TEXT_PPSAL_TYPE.CHANGED_TEXT
					: objectsTextOriginal[rowObjectIndex][fieldPpsalType];

			// Los datos se cambian siempre porque puede haber cambios en el tipo de propuesta, aunque se indique que los valores sean iguales.
			translateActions.setObjectsText(newObjectsText);
		},
		[objectsTextOriginal, objectsText]
	);

	return {
		convertObjectTexts2AddObjects,
		determinePpsalTypeFromColumnId,
		determineColTextFromColumnId,
		processRowChanged,
	};
}
