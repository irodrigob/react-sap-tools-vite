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
import { ValueState } from "@ui5/webcomponents-react/ssr";

export default function useTranslate() {
	const { getI18nText, language } = useTranslations();
	const translateController = new TranslateController();
	const [languages, setLanguages] = useState<Languages>([]);
	const [selectableObjects, setSelectableObjects] = useState<SelectableObjects>(
		[]
	);
	const [loadingLanguages, setLoadingLanguages] = useState(false);
	const [loadingSelectableObjects, setLoadingSelectableLanguages] =
		useState(false);
	const [paramsObjectsTranslate, setParamsObjectsTranslate] =
		useState<ParamsObjectTranslate>({
			depthRefs: 1,
			object: "",
			objectName: "",
			oLang: language.toLocaleUpperCase(),
			order: "",
			tLang: [],
		});
	const [originLanguage, setOriginLanguage] = useState(language);
	const [filterValueState, setFilterValueState] = useState<FiltersValueState>({
		objectState: ValueState.None,
		objectStateMessage: "",
		orderState: ValueState.None,
		orderStateMessage: "",
	});
	const sapController = new SAPController();
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
		// Localiza el idioma por defecto que se conecta al sistema
		let systemLanguage = languages.find((row) => row.isSystemLanguage);

		// Si el idioma del sistema al que se conecta es distinto al del navegador, entonces
		// pongo por defecto el idioma del sistema
		if (systemLanguage) {
			setOriginLanguage(systemLanguage.language);
			setParamsObjectsTranslate({
				...paramsObjectsTranslate,
				oLang: systemLanguage.language,
			});
		}
	};

	return {
		languages,
		setLanguages,
		selectableObjects,
		setSelectableObjects,
		loadInitialData,
		loadingLanguages,
		loadingSelectableObjects,
		paramsObjectsTranslate,
		setParamsObjectsTranslate,
		originLanguage,
		filterValueState,
		setFilterValueState,
	};
}
