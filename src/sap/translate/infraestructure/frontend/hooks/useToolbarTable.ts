import { useTranslations } from "translations/i18nContext";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useAppSelector } from "shared/storage/useStore";
import { useCallback } from "react";
import useDataManager from "./useDataManager";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { ReturnsDTO } from "shared/dto/generalDTO";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";

export default function useToolbarTable() {
	const { getI18nText } = useTranslations();
	const {
		showMessage,
		updateResultError,
		updateMessage,
		convertServiceSAPMsgType,
	} = useMessages();
	const { convertObjectTexts2AddObjects } = useDataManager();
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const sapTranslateController = new SAPTranslateController();
	const messageManagerController = new MessageManagerController();

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

	return { handlerAddObjects };
}
