import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { useCallback, useMemo } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import CellTextLang from "sap/translate/infraestructure/frontend/components/tableText/cellTextLang";
import ObjectText from "sap/translate/domain/entities/objectText";

export default function useObjectTextTable() {
	const { getI18nText } = useTranslations();
	const { objectsText, objectsTextsChanged, objectsTextsOriginal } =
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
		for (let x = 1; x <= 10; x++) {
			let langField = `langTlang${x}`;
			if (objectsText[0][langField] != "") {
				let colField = `colTlang${x}`;
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

	const updateRowChanged = useCallback(
		(rowChanged: ObjectText) => {},
		[objectsTextsChanged, objectsTextsOriginal]
	);

	return { columnsTable, updateRowChanged };
}
