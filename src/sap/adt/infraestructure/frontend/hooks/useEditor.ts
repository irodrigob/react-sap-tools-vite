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
import EditorClassContainer from "sap/adt/infraestructure/frontend/components/editorArea/editor/class/editorClassContainer";

export default function useEditor() {
	const adtController = new SAPAdtController();
	const { setLoadingObjectAction, setContentObjectAction } = useAdtStore();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError, showMessage } = useMessages();
	const { getI18nText } = useTranslations();
	const { objectsEditor } = useAppSelector((state) => state.ADT);

	const getObjectContent = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			// Si el objeto existe se indica que se va cargar los datos y en caso contrario se añade
			if (checkObjectExist(objectInfo)) {
				setLoadingObjectAction(objectInfo);
			} else {
			}

			let objectController = new SAPAdtObjectController(objectInfo.objectType);
			objectController
				.getObjectContent(
					getDataForConnection("base"),
					objectInfo.object.objectUri
				)
				.then((response) => {
					if (response.isSuccess) {
						setContentObjectAction(
							objectInfo,
							response.getValue() as ADTClassContent
						);
						setLoadingObjectAction(objectInfo);
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
	const checkObjectExist = useCallback(
		(objectInfo: ADTObjectInfoEditor) => {
			return objectsEditor.findIndex(
				(row) =>
					row.objectKey ==
					`${objectInfo.objectType}_${objectInfo.object.objectName}`
			) == -1
				? false
				: true;
		},
		[objectsEditor]
	);

	return { getObjectContent, checkObjectExist };
}
