import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import useDataManager from "sap/translate/infraestructure/frontend/hooks/useDataManager";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import CellTextLang from "sap/translate/infraestructure/frontend/components/tableText/cellTextLang";
import ObjectText from "sap/translate/domain/entities/objectText";
import {
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default function useObjectTextTable() {
	const { getI18nText } = useTranslations();
	const { objectsText, columnsObjectsText } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const { determinePpsalTypeFromColumnId } = useDataManager();
	const translateActions = new SAPTranslateActions();
	const [selectedObjectText, setSelectedObjectText] = useState<ObjectsText>([]);

	useEffect(() => {
		if (objectsText.length > 0) {
			// Campos fijos
			let columnsTmp: AnalyticalTableColumnDefinition[] = [
				{
					Header: getI18nText("translate.objectsTextTable.lblObject"),
					headerTooltip: getI18nText("translate.objectsTextTable.lblObject"),
					accessor: "object",
					maxWidth: 80,
				},
				{
					Header: getI18nText("translate.objectsTextTable.lblObjectName"),
					headerTooltip: getI18nText(
						"translate.objectsTextTable.lbllblObjectNamebject"
					),
					accessor: "objName",
				},
				{
					Header: getI18nText("translate.objectsTextTable.lblObjtype"),
					headerTooltip: getI18nText("translate.objectsTextTable.lblObjtype"),
					accessor: "objType",
					maxWidth: 80,
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
			translateActions.setColumnsObjectsText(columnsTmp);
		}
	}, [objectsText]);

	/**
	 * Marca/Desmarca las filas de la tabla de textos
	 * @param objectsText
	 */
	const setRowSelected = useCallback(
		(rowsSelected: ObjectsText) => {
			if (rowsSelected.length > 0) {
				let newRowSelected = [...selectedObjectText];
				rowsSelected.forEach((rowSelected) => {
					let tabix = newRowSelected.findIndex(
						(row: ObjectText) =>
							row.object == rowSelected.object &&
							row.objName == rowSelected.objName &&
							row.objType == rowSelected.objType &&
							row.idText == rowSelected.idText
					);
					if (tabix !== -1) newRowSelected.splice(tabix, tabix >= 0 ? 1 : 0);
					else newRowSelected.push(rowSelected);
				});

				setSelectedObjectText(newRowSelected);
			} else {
				setSelectedObjectText([]);
			}
		},
		[selectedObjectText]
	);

	return {
		columnsObjectsText,
		selectedObjectText,
		setRowSelected,
	};
}
