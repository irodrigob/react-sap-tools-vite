import { AnalyticalTableColumnDefinition } from "@ui5/webcomponents-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	ObjectsText,
	ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate.d";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import useDataManager from "sap/translate/infraestructure/frontend/hooks/useDataManager";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import CellTextLang from "sap/translate/infraestructure/frontend/components/tableText/cellTextLang";
import ObjectText from "sap/translate/domain/entities/objectText";
import {
	TEXT_PPSAL_TYPE,
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";

export default function useObjectTextTable() {
	const { getI18nText } = useTranslations();
	const {
		objectsText,
		objectsTextOriginal,
		paramsObjectsTranslate,
		columnsObjectsText,
	} = useAppSelector((state) => state.SAPTranslate);
	const { determinePpsalTypeFromColumnId } = useDataManager();
	const translateActions = new SAPTranslateActions();
	const {
		showMessage,
		updateResultError,
		updateMessage,
		convertServiceSAPMsgType,
	} = useMessages();
	const translateController = new SAPTranslateController();
	const messageManagerController = new MessageManagerController();
	const [selectedObjectText, setSelectedObjectText] = useState<ObjectsText>([]);

	useEffect(() => {
		if (objectsText.length > 0) {
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
			translateActions.setColumnsObjectsText(columnsTmp);
		}
	}, [objectsText]);

	/*	const saveObjectsText = useCallback(() => {
		let objectsTextToSave: ObjectsText = [];
		// Solo se graban aquellos registors modificados, eso se sabe por el campo de de tipo de proppuesta de texto.
		objectsText.forEach((objectText) => {
			for (let x = 1; x <= NUMBER_FIELD_TLANG; x++) {
				let ppsalField = `${FIELDS_TEXT.PPSAL_TYPE}${x}`;
				let langField = `${FIELDS_TEXT.LANGUAGE}${x}`;
				if (objectText[langField] != "") {
					if (objectText[ppsalField] == TEXT_PPSAL_TYPE.CHANGED_TEXT)
						objectsTextToSave.push(objectText);
				} else {
					break;
				}
			}
		});
		if (objectsTextToSave.length > 0) {
			let toastID = showMessage(
				getI18nText("translate.objectsTextTable.saveInProcess"),
				MessageType.info
			);
			translateController
				.saveObjectTranslate(paramsObjectsTranslate, objectsTextToSave)
				.then((resultSave) => {
					if (resultSave.isSuccess) {
						let result = resultSave.getValue() as ResponseSaveObjectText;

						messageManagerController.addFromSAPArrayReturn(result.return);

						updateMessage(
							toastID,
							result.return[0].message,
							convertServiceSAPMsgType(result.return[0].type)
						);

						// Actualizo el modelo con los datos devueltos.
						translateActions.setObjectsText(result.objectText);
						translateActions.setObjectsTextOriginal(result.objectText);
					} else {
						updateResultError(
							toastID,
							resultSave.getErrorValue() as ErrorGraphql
						);
					}
				});
		} else {
			showMessage(
				getI18nText("translate.objectsTextTable.noDataChanged"),
				MessageType.info
			);
		}
	}, [objectsText, objectsTextOriginal]);*/
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
