import { useCallback, useState } from "react";
import {
	Languages,
	ObjectsText,
	SelectableObjects,
	ResponseSaveObjectText,
} from "sap/translate/infraestructure/types/translate";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import useSAPTranslateStore from "sap/translate/infraestructure/frontend/hooks/useSAPTranslateStore";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { APP } from "sap/translate/infraestructure/utils/constants/constantsTranslate";

export default function useTranslate() {
	const { getI18nText, language } = useTranslations();
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const translateController = new SAPTranslateController();
	const [languages, setLanguages] = useState<Languages>([]);
	const [selectableObjects, setSelectableObjects] = useState<SelectableObjects>(
		[]
	);
	const [loadingLanguages, setLoadingLanguages] = useState(false);
	const [loadingSelectableObjects, setLoadingSelectableLanguages] =
		useState(false);
	const [originLanguage, setOriginLanguage] = useState(language);
	const [loadingObjectsText, setLoadingObjectsText] = useState(false);
	const [loadObjectsText, setLoadObjectsText] = useState(false);
	const { setParamsObjectsTranslateAction } = useSAPTranslateStore();
	const {
		showResultError,
		showMessage,
		updateMessage,
		updateResultError,
		convertServiceSAPMsgType,
	} = useMessages();
	const messageManagerController = new MessageManagerController();
	const { setSystemChangedAction, setApplicationChangedAction } =
		useSAPGeneralStore();
	const { setObjectsTextAction, setObjectsTextOriginalAction } =
		useSAPTranslateStore();
	const { getDataForConnection } = useSAPGeneral();
	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		setSystemChangedAction(false);
		setApplicationChangedAction(false);

		loadLanguages();
		loadSelectableObjects();
	}, []);

	/**
	 * Lectura de los lenguajes que se puede seleccionar
	 */
	const loadLanguages = useCallback(() => {
		setLoadingLanguages(true);
		translateController
			.getLanguages(getDataForConnection(APP))
			.then((resultLanguages) => {
				setLoadingLanguages(false);
				if (resultLanguages.isSuccess) {
					setLanguages(resultLanguages.getValue() as Languages);
					determineDefaultOriginLanguage(
						resultLanguages.getValue() as Languages
					);
				} else {
					showResultError(resultLanguages.getErrorValue() as ErrorGraphql);
				}
			});
	}, []);
	/**
	 * Lectura de los objetos que se pueden traduccir
	 */
	const loadSelectableObjects = useCallback(() => {
		setLoadingSelectableLanguages(true);
		translateController
			.getSelectableObjects(getDataForConnection(APP))
			.then((resultSelecttableLanguages) => {
				setLoadingSelectableLanguages(false);
				if (resultSelecttableLanguages.isSuccess) {
					setSelectableObjects(
						resultSelecttableLanguages.getValue() as SelectableObjects
					);
				} else {
					showResultError(
						resultSelecttableLanguages.getErrorValue() as ErrorGraphql
					);
				}
			});
	}, []);

	/**
	 * Determina el lenguaje de origen en los parámetros por defecto
	 * @param languages Idiomas
	 */
	const determineDefaultOriginLanguage = (languages: Languages): void => {
		let oLang = language;
		let systemLanguage = languages.find((row) => row.isSystemLanguage);

		// Si el idioma del sistema al que se conecta es distinto al del navegador, entonces
		// pongo por defecto el idioma del sistema
		if (systemLanguage) oLang = systemLanguage.language;

		setOriginLanguage(oLang);
		setParamsObjectsTranslateAction({
			...paramsObjectsTranslate,
			oLang: oLang,
		});
	};
	/**
	 * Lectura de los datos de traducción
	 */
	const getObjectTranslate = useCallback(() => {
		setLoadingObjectsText(true);
		translateController
			.getObjectTranslate(getDataForConnection(APP), paramsObjectsTranslate)
			.then((resultObjectTranslate) => {
				setLoadingObjectsText(false);
				if (resultObjectTranslate.isSuccess) {
					setObjectsTextAction(resultObjectTranslate.getValue() as ObjectsText);
					setObjectsTextOriginalAction(
						resultObjectTranslate.getValue() as ObjectsText
					);
				} else {
					showResultError(
						resultObjectTranslate.getErrorValue() as ErrorGraphql
					);
				}
			});
	}, [paramsObjectsTranslate]);

	/**
	 * Grabación de los textos modificados
	 * @param objectsText | Tabla con los textos
	 */
	const saveObjectsText = useCallback((objectsTextToSave: ObjectsText) => {
		let toastID = showMessage(
			getI18nText("translate.objectsTextTable.saveInProcess"),
			MessageType.info
		);
		translateController
			.saveObjectTranslate(
				getDataForConnection(APP),
				paramsObjectsTranslate,
				objectsTextToSave
			)
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
					setObjectsTextAction(result.objectText);
					setObjectsTextOriginalAction(result.objectText);
				} else {
					updateResultError(
						toastID,
						resultSave.getErrorValue() as ErrorGraphql
					);
				}
			});
	}, []);

	return {
		languages,
		setLanguages,
		selectableObjects,
		setSelectableObjects,
		loadInitialData,
		loadingLanguages,
		loadingSelectableObjects,
		originLanguage,
		getObjectTranslate,
		loadingObjectsText,
		loadObjectsText,
		setLoadObjectsText,
		saveObjectsText,
	};
}
