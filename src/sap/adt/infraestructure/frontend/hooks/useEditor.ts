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
import { ADTObjectStructure } from "sap/adt/domain/entities/objectStructure";

export default function useEditor() {
	const adtController = new SAPAdtController();
	const {
		setLoadingContentObjectAction,
		setObjectContentAction,
		updateObjectEditorAction,
		setObjectStructureAction,
		setLoadingStructureObjectAction,
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
			if (checkObjectExist(objectInfo))
				setLoadingContentObjectAction(objectKey);

			let objectController = new SAPAdtObjectController(objectInfo.objectType);
			objectController
				.getObjectContent(
					getDataForConnection("base"),
					objectInfo.object.objectUri
				)
				.then((response) => {
					setLoadingContentObjectAction(objectKey);
					if (response.isSuccess) {
						setObjectContentAction(
							objectKey,
							response.getValue() as ADTClassContent
						);

						// Se lanza el proceso de lectura de la estructura del objeto
						getObjectStructure(objectInfo);
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
	 * Carga la estructura (variables, tipos de datos y su posición) de ub objeto.
	 * El parámetro me sirve para indicar si se lee el contenido del objeto activo para
	 * que se lancen procesos
	 */
	const getObjectStructure = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			let objectKey = buildObjectKey(objectInfo);
			let objectController = new SAPAdtObjectController(objectInfo.objectType);
			setLoadingStructureObjectAction(objectKey);
			objectController
				.getObjectStructure(
					getDataForConnection("base"),
					objectInfo.object.objectUri
				)
				.then((response) => {
					setLoadingStructureObjectAction(objectKey);
					if (response.isSuccess) {
						setObjectStructureAction(
							objectKey,
							response.getValue() as ADTObjectStructure
						);
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
		[objectsEditor, objectKeyActive]
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
