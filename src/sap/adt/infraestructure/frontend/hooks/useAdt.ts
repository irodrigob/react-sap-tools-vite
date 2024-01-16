import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import ADTActions from "sap/adt/infraestructure/storage/adtActions";
import { ResponseFavoritePackages } from "sap/adt/infraestructure/types/adt";
import { useSession } from "auth/authProvider";

export default function useAdt() {
	const adtController = new SAPAdtController();
	const sapController = new SAPController();
	const { getI18nText, language } = useTranslations();
	const adtActions = new ADTActions();
	const { session } = useSession();

	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		sapController.setSystemChanged(false);
		sapController.setApplicationChanged(false);
	}, []);

	const loadFavoritePackages = useCallback(() => {
		adtController
			.getFavoritePackages(session.email)
			.then((responseFavorite) => {});
	}, []);

	return { loadInitialData };
}
