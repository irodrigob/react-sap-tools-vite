import { AdtPackageObject } from "sap/adt/domain/entities/packageContent";
import { useCallback } from "react";
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

export default function useEditor() {
	const adtController = new SAPAdtController();
	const { setContentPackageAction } = useAdtStore();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError, showMessage } = useMessages();
	const { getI18nText } = useTranslations();

	const getObjectContent = useCallback(
		(
			objectType: string,
			objectTypeDesc: string,
			objectData: AdtPackageObject
		) => {
			let objectController = new SAPAdtObjectController(objectType);
			objectController
				.getObjectContent(getDataForConnection("base"), objectData.objectUri)
				.then((response) => {
					if (response.isSuccess) {
					} else {
						let error = response.getErrorValue();
						if (error instanceof ErrorGeneral)
							showMessage(
								getI18nText("adtIde.editor.objectTypeNotImplemented", {
									objectTypeDesc: objectTypeDesc,
								}),
								MessageType.warning
							);
						else showResultError(response.getErrorValue() as ErrorGraphql);
					}
				});
		},
		[]
	);

	return { getObjectContent };
}
