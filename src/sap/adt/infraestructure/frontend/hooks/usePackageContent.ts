import { useCallback, useState } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { ResponsePackageContent } from "sap/adt/infraestructure/types/adt";
import useMessages from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { AdtPackageContents } from "sap/adt/domain/entities/packageContent";

export default function usePackageContent() {
	const { getI18nText, language } = useTranslations();
	const adtController = new SAPAdtController();
	const { getDataForConnection } = useSAPGeneral();
	const { showResultError } = useMessages();
	const [loadingPackage, setLoadingPackage] = useState(false);

	const getPackageContent = useCallback((packageName: string) => {
		setLoadingPackage(true);
		adtController
			.getPackageContent(getDataForConnection("base"), packageName)
			.then((response: ResponsePackageContent) => {
				if (response.isSuccess) {
					let content = response.getValue() as AdtPackageContents;
					console.log(content);
				} else {
					showResultError(response.getErrorValue() as ErrorGraphql);
				}
			});
	}, []);

	return { getPackageContent, loadingPackage };
}
