import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { useCallback, useMemo } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import CellTextLang from "sap/translate/infraestructure/frontend/components/tableText/cellTextLang";
import ObjectText from "sap/translate/domain/entities/objectText";
import {
	TEXT_PPSAL_TYPE,
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default function useObjectTextTable() {
	const { getI18nText } = useTranslations();
	const { objectsText, objectsTextChanged, objectsTextOriginal } =
		useAppSelector((state) => state.SAPTranslate);
	const sapTranslateActions = new SAPTranslateActions();
	const columnsTable: AnalyticalTableColumnDefinition[] = useMemo(() => {
		// Campos fijos
		let columnsTmp: AnalyticalTableColumnDefinition[] = [
			{
				Header: getI18nText("translate.objectsTextTable.lblObjtype"),
				headerTooltip: getI18nText("translate.objectsTextTable.lblObjtype"),
				accessor: "objType",
				maxWidth: 80,
			},
			{
				Header: getI18nText("translate.objectsTextTable.lblObject"),
				headerTooltip: getI18nText("translate.objectsTextTable.lblObject"),
				accessor: "objName",
			},
			{
				Header: getI18nText("translate.objectsTextTable.lblIdText"),
				headerTooltip: getI18nText("translate.objectsTextTable.lblIdText"),
				accessor: "idText",
			},
		];
		// El idioma origen viene del primer registro de la tabla
		columnsTmp.push({
			Header: objectsText[0].colOlang,
			headerTooltip: objectsText[0].colOlang,
			accessor: "txtOlang",
		});

		// Idiomas de destino
		for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
			let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;
			if (objectsText[0][langField] != "") {
				let colField = `${FIELDS_TEXT.COL_TEXT}${x}`;
				columnsTmp.push({
					Header: objectsText[0][colField],
					headerTooltip: objectsText[0][colField],
					accessor: `txtTlang${x}`,
					Cell: CellTextLang,
				});
			}
		}

		return columnsTmp;
	}, [objectsText]);

	/**
	 * En base al ID de la columna de la tabla se devuelve el campo que contiene el tipo de
	 * propuesta de texto
	 * @param columnId | Id de columna con el texto
	 * @returns | Nombre de columna de la propuesta de texto
	 */
	const determinePpsalTypeFromColumnId = (columnId: string) => {
		return columnId.replace(FIELDS_TEXT.TEXT, FIELDS_TEXT.PPSAL_TYPE);
	};
	/**
	 * En base al ID de la columna de la tabla se devuelve el campo que contiene el idioma de destino
	 * @param columnId | Id de columna con el texto
	 * @returns | Nombre de columna de la propuesta de texto
	 */
	const determineColTextFromColumnId = (columnId: string) => {
		return columnId.replace(FIELDS_TEXT.TEXT, FIELDS_TEXT.COL_TEXT);
	};
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
			let newObjectsChanged = structuredClone(objectsTextChanged);
			let fieldPpsalType = determinePpsalTypeFromColumnId(columnId);

			let rowObjectIndex = newObjectsText.findIndex(
				(row: ObjectText) =>
					row.object == rowChanged.object &&
					row.objName == rowChanged.objName &&
					row.objType == rowChanged.objType &&
					row.idText == rowChanged.idText
			);
			let rowObjectChangedIndex = objectsTextChanged.findIndex(
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
			sapTranslateActions.setObjectsText(newObjectsText);

			/*
			// Se compara la fila actualiza con los datos originales para ver si hay cambios.
			// Lo hago aquí dentro porque con los índices es muy simple acceder a los campos por variables
			let dataChanged = false;
			for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
				let langField = `${FIELDS_TEXT.TEXT}${x}`;
				let colField = `${FIELDS_TEXT.COL_TEXT}${x}`;
				if (newObjectsText[rowObjectIndex][colField] != "")
					if (
						newObjectsText[rowObjectIndex][langField] !=
						objectsTextOriginal[rowObjectIndex][langField]
					) {
						dataChanged = true;
						break;
					} else break;
			}
			
			// Datos cambios se actualiza la storage y se añade o modifica en la tabla de registros cambios
			if (dataChanged) {
				if (rowObjectChangedIndex == -1)
					newObjectsChanged.push(newObjectsText[rowObjectIndex]);
				else
					newObjectsChanged[rowObjectChangedIndex] =
						newObjectsText[rowObjectIndex];
				sapTranslateActions.setObjectsTextChanged(newObjectsChanged);
			}
			// Si no hay cambios y el registro existe en la tabla de datos modificados se borra // Si existe el registro en los datos modificados lo elimino
			else if (rowObjectChangedIndex != -1) {
				newObjectsChanged.splice(
					rowObjectChangedIndex,
					rowObjectChangedIndex >= 0 ? 1 : 0
				);
				sapTranslateActions.setObjectsTextChanged(newObjectsChanged);
			}*/
		},
		[objectsTextChanged, objectsTextOriginal, objectsText]
	);

	return { columnsTable, processRowChanged, determinePpsalTypeFromColumnId };
}
