import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { useMemo } from "react";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";

export default function useObjectTextTable(objectsText: ObjectsText) {
	const { getI18nText } = useTranslations();
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
				});
			}
		}

		return columnsTmp;
	}, [objectsText]);

	return { columnsTable };
}
