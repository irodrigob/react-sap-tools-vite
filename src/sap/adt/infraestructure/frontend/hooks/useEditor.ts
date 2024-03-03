import { FC, useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import SAPAdtObjectController from "sap/adt/infraestructure/controller/sapAdtObjectController";
import useAdtStore from "./useAdtStore";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import { useTranslations } from "translations/i18nContext";
import {
	ADTObjectEditor,
	ADTObjectInfoEditor,
} from "sap/adt/infraestructure/types/adt";
import { useAppSelector } from "shared/storage/useStore";
import { ADTClassContent } from "sap/adt/domain/entities/classContent";
import { ADT_OBJECT_TYPES } from "sap/adt/infraestructure/constants/adtConstants";

export default function useEditor() {
	const adtController = new SAPAdtController();
	const {
		setLoadingObjectAction,
		setContentObjectAction,
		setObjectEditorActiveAction,
		updateObjectEditorAction,
	} = useAdtStore();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError, showMessage } = useMessages();
	const { getI18nText } = useTranslations();
	const { objectsEditor, objectKeyActive } = useAppSelector(
		(state) => state.ADT
	);

	const getObjectContent = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			let objectKey = buildObjectKey(objectInfo);
			// Si el objeto existe se indica que se va cargar los datos y en caso contrario se añade
			if (checkObjectExist(objectInfo)) setLoadingObjectAction(objectKey);

			let objectController = new SAPAdtObjectController(objectInfo.objectType);
			objectController
				.getObjectContent(
					getDataForConnection("base"),
					objectInfo.object.objectUri
				)
				.then((response) => {
					if (response.isSuccess) {
						setLoadingObjectAction(objectKey);
						setContentObjectAction(
							objectKey,
							response.getValue() as ADTClassContent
						);
						// Si no hay registros en el array de objetos en el editor fuerzo la actualizacion del objeto activo.
						// Se hace porque la primera no hay ningun estado, objectKeyActive, actualizado hasta que no finalice el montaje del componente.
						// Con lo cual no se puede hacer de manera automática
						if (objectsEditor.length == 0)
							setObjectEditorActiveAction(objectKey);
					} else {
						let error = response.getErrorValue();
						if (error instanceof ErrorGeneral)
							showMessage(
								getI18nText("adtIde.editor.objectTypeNotImplemented", {
									objectTypeDesc: objectInfo.objectTypeDesc,
								}),
								MessageType.warning
							);
						else showResultError(response.getErrorValue() as ErrorGraphql);
					}
				});
		},
		[objectsEditor]
	);
	/**
	 * Verifica si un objeto ya esta insertado en el modelo
	 */
	const checkObjectExist = useCallback(
		(objectInfo: ADTObjectInfoEditor | string) => {
			let objectKey =
				typeof objectInfo == "string" ? objectInfo : buildObjectKey(objectInfo);

			return objectsEditor.findIndex((row) => row.objectKey == objectKey) == -1
				? false
				: true;
		},
		[objectsEditor]
	);
	/**
	 * Devuelve el objeto activo en el editor
	 */
	const getObjectEditorActive = useCallback(() => {
		return objectsEditor.find(
			(row) => row.objectKey == objectKeyActive
		) as ADTObjectEditor;
	}, [objectsEditor, objectKeyActive]);
	/**
	 * Construye la clave del objeto
	 */
	const buildObjectKey = useCallback((objectInfo: ADTObjectInfoEditor) => {
		return `${objectInfo.objectType}_${objectInfo.object.objectName}`;
	}, []);

	const getDefaultSectionSource = useCallback((objectType: string): string => {
		if (objectType.includes(ADT_OBJECT_TYPES.CLASSES.OBJECT_TYPE))
			return ADT_OBJECT_TYPES.CLASSES.EDITOR.DEFAULT_SECTION;

		return "";
	}, []);
	/**
	 * Actualiza los datos del objeto pasado al modelo prinicipal, y si
	 * la clave es igual a la activa también actualiza el objeto activo
	 */
	const updateModelObjectEditor = useCallback(
		(objectEditor: ADTObjectEditor) => {
			if (objectKeyActive == objectEditor.objectKey)
				setObjectEditorActiveAction(objectEditor);
			updateObjectEditorAction(objectEditor);
		},
		[objectKeyActive]
	);

	return {
		getObjectContent,
		checkObjectExist,
		getObjectEditorActive,
		buildObjectKey,
		getDefaultSectionSource,
		updateModelObjectEditor,
	};
}
