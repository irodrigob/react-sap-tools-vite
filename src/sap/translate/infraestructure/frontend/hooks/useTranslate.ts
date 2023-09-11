import { useCallback, useState } from "react";
import {
	Languages,
	ObjectsText,
	SelectableObjects,
	ParamsObjectTranslate,
	FiltersValueState,
} from "sap/translate/infraestructure/types/translate";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import TranslateController from "sap/translate/infraestructure/controller/translateController";
import SAPController from "sap/general/infraestructure/controller/sapController";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import SAPTranslateActions from "sap/translate/infraestructure/storage/sapTranslateActions";

export default function useTranslate() {
	const { getI18nText, language } = useTranslations();
	const { paramsObjectsTranslate } = useAppSelector(
		(state) => state.SAPTranslate
	);
	const translateController = new TranslateController();
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

	const sapController = new SAPController();
	const sapTranslateActions = new SAPTranslateActions();
	const { showResultError, showMessage, updateMessage, updateResultError } =
		useMessages();

	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		sapController.setSystemChanged(false);

		loadLanguages();
		loadSelectableObjects();
	}, []);

	/**
	 * Lectura de los lenguajes que se puede seleccionar
	 */
	const loadLanguages = useCallback(() => {
		setLoadingLanguages(true);
		translateController.getLanguages().then((resultLanguages) => {
			setLoadingLanguages(false);
			if (resultLanguages.isSuccess) {
				setLanguages(resultLanguages.getValue() as Languages);
				determineDefaultOriginLanguage(resultLanguages.getValue() as Languages);
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
			.getSelectableObjects()
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
		sapTranslateActions.setParamsObjectsTranslate({
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
			.getObjectTranslate(paramsObjectsTranslate)
			.then((resultObjectTranslate) => {
				setLoadingObjectsText(false);
				if (resultObjectTranslate.isSuccess) {
					sapTranslateActions.setObjectsText(
						resultObjectTranslate.getValue() as ObjectsText
					);
					sapTranslateActions.setObjectsTextOriginal(
						resultObjectTranslate.getValue() as ObjectsText
					);
				} else {
					showResultError(
						resultObjectTranslate.getErrorValue() as ErrorGraphql
					);
				}
			});
	}, [paramsObjectsTranslate]);

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
	};
}
