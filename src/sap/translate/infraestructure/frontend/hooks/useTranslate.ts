import { useCallback, useState } from "react";
import {
  Languages,
  ObjectsText,
  SelectableObjects,
} from "sap/translate/infraestructure/types/translate";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import TranslateController from "sap/translate/infraestructure/controller/translateController";
import SAPController from "sap/general/infraestructure/controller/sapController";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";

export default function useTranslate() {
  const translateController = new TranslateController();
  const [languages, setLanguages] = useState<Languages>([]);
  const [selectableObjects, setSelectableObjects] = useState<SelectableObjects>(
    []
  );
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingSelectableLanguages, setLoadingSelectableLanguages] =
    useState(false);
  const sapController = new SAPController();
  const { showResultError, showMessage, updateMessage, updateResultError } =
    useMessages();

  const loadInitialData = useCallback(() => {
    sapController.setSystemChanged(false);

    loadLanguages();
    loadSelectableObjects();
  }, []);

  const loadLanguages = useCallback(() => {
    setLoadingLanguages(true);
    translateController.getLanguages().then((resultLanguages) => {
      setLoadingLanguages(false);
      if (resultLanguages.isSuccess) {
        setLanguages(resultLanguages.getValue() as Languages);
      } else {
        showResultError(resultLanguages.getErrorValue() as ErrorGraphql);
      }
    });
  }, []);
  const loadSelectableObjects = useCallback(() => {
    setLoadingSelectableLanguages(true);
    translateController
      .getSelectableObjects()
      .then((resultSelecttableLanguages) => {
        setLoadingSelectableLanguages(false);
        if (resultSelecttableLanguages.isSuccess) {
          setLanguages(
            resultSelecttableLanguages.getValue() as SelectableObjects
          );
        } else {
          showResultError(
            resultSelecttableLanguages.getErrorValue() as ErrorGraphql
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
    loadingSelectableLanguages,
  };
}
