import { useCallback, useState } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { ResponsePackageContent } from "sap/adt/infraestructure/types/adt";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";
import useAdtStore from "./useAdtStore";

export default function usePackageContent() {
	const { getI18nText } = useTranslations();
	const adtController = new SAPAdtController();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError } = useMessages();
	const {
		setLoadingContentPackageAction,
		setLoadedContentPackageAction,
		setContentPackageAction,
	} = useAdtStore();

	const getPackageContent = useCallback((packageName: string) => {
		setLoadingContentPackageAction(packageName);
		adtController
			.getPackageContent(getDataForConnection("base"), packageName)
			.then((response: ResponsePackageContent) => {
				setLoadingContentPackageAction(packageName);
				setLoadedContentPackageAction(packageName);
				if (response.isSuccess) {
					setContentPackageAction({
						packageName: packageName,
						content: response.getValue() as AdtPackageContents,
					});
				} else {
					showResultError(response.getErrorValue() as ErrorGraphql);
				}
			});
	}, []);

	return { getPackageContent };
}
