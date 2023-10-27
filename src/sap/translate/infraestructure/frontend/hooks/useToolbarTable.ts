import { useTranslations } from "translations/i18nContext";
import {
	ObjectsText,
	ParamsObjectTranslate,
} from "sap/translate/infraestructure/types/translate.d";
import ObjectText from "sap/translate/domain/entities/objectText";

import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useAppSelector } from "shared/storage/useStore";
import { useCallback, useState } from "react";
import useDataManager from "./useDataManager";
import useExcelManager from "./useExcelManager";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { ReturnsDTO } from "shared/dto/generalDTO";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
import useTranslate from "./useTranslate";
import {
	TEXT_PPSAL_TYPE,
	FIELDS_TEXT,
	NUMBER_FIELD_TLANG,
} from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default function useToolbarTable() {
	const { getI18nText } = useTranslations();
	const {
		showMessage,
		updateResultError,
		updateMessage,
		convertServiceSAPMsgType,
	} = useMessages();
	const { convertObjectTexts2AddObjects } = useDataManager();
	const { paramsObjectsTranslate, objectsText } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const sapTranslateController = new SAPTranslateController();
	const messageManagerController = new MessageManagerController();
	const { saveObjectsText } = useTranslate();
	const { generateExcel, processExcelFile } = useExcelManager();
	const [openPopupUploadTemplate, setOpenPopupUploadTemplate] = useState(false);
	const sapTranslateActions = new SAPTranslateActions();

	/**
	 * Gestiona añadir objetos a una orden
	 * @param selectedObjectText | Objetos seleccionados
	 */
	const handlerAddObjects = useCallback(
		(selectedObjectText: ObjectsText) => () => {
			if (selectedObjectText.length > 0) {
				if (paramsObjectsTranslate.order == "") {
					showMessage(
						getI18nText("translate.toolbarActionsTable.noOrderSelected"),
						MessageType.warning
					);
				} else {
					let toastID = showMessage(
						getI18nText("translate.objectsTextTable.addingObjects2Order"),
						MessageType.info
					);
					sapTranslateController
						.addObjects2Order(
							paramsObjectsTranslate,
							convertObjectTexts2AddObjects(selectedObjectText)
						)
						.then((responseAddObjects) => {
							if (responseAddObjects.isSuccess) {
								let returnMessages =
									responseAddObjects.getValue() as ReturnsDTO;

								messageManagerController.addFromSAPArrayReturn(returnMessages);

								updateMessage(
									toastID,
									returnMessages[0].message,
									convertServiceSAPMsgType(returnMessages[0].type)
								);
							} else {
								updateResultError(
									toastID,
									responseAddObjects.getErrorValue() as ErrorGraphql
								);
							}
						});
				}
			} else {
				showMessage(
					getI18nText("translate.toolbarActionsTable.noObjectTextSelected"),
					MessageType.warning
				);
			}
		},
		[paramsObjectsTranslate]
	);

	/**
	 * Gestiona el proceso de grabación de los textos
	 */
	const handlerSaveObjectsText = useCallback(() => {
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
			saveObjectsText(objectsTextToSave);
		} else {
			showMessage(
				getI18nText("translate.objectsTextTable.noDataChanged"),
				MessageType.info
			);
		}
	}, [objectsText]);

	/**
	 * Gestiona la descarga de los objetos de los textos a excel
	 */
	const handlerDownloadExcel = useCallback(
		(objectsText: ObjectsText, paramsObjectsTranslate: ParamsObjectTranslate) =>
			() => {
				generateExcel(
					objectsText,
					`${paramsObjectsTranslate.object}_${paramsObjectsTranslate.objectName}.xlsx`
				);
			},
		[objectsText]
	);
	/**
	 * Gestiona la subida del template
	 */
	const handlerUploadTemplate = useCallback(
		(objectsText: ObjectsText, contentFile: Uint8Array) => {
			// Se convierte el contenido del fichero a una tabla formato ObjectsExcel
			// El array que me devuelve puede tener los campos incorrectos si alguien cambia
			// la primera fila del excel, que esta oculta, que es lo que usa SheetJS para devolver
			// el JSON con los datos del fichero
			let objectsTextExcel = processExcelFile(contentFile);
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
							} catch {}
						}
					}
				}
			});

			sapTranslateActions.setObjectsText(newObjectsText);
		},
		[]
	);

	return {
		handlerAddObjects,
		handlerSaveObjectsText,
		handlerDownloadExcel,
		openPopupUploadTemplate,
		setOpenPopupUploadTemplate,
		handlerUploadTemplate,
	};
}
