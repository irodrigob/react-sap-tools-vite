import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { useTranslations } from "translations/i18nContext";
import { useAppSelector } from "shared/storage/useStore";
import ADTActions from "sap/adt/infraestructure/storage/adtActions";
import { ResponseFavoritePackages } from "sap/adt/infraestructure/types/adt";
import { useSession } from "auth/authProvider";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { ADTFavoritePackages } from "sap/adt/domain/entities/favoritePackage";

export default function useAdt() {
	const adtController = new SAPAdtController();
	const sapController = new SAPController();
	const { getI18nText, language } = useTranslations();
	const adtActions = new ADTActions();
	const { session } = useSession();
	const { showResultError, showMessage } = useMessages();

	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		sapController.setSystemChanged(false);
		sapController.setApplicationChanged(false);

		loadFavoritePackages();
	}, []);

	/**
	 * Lectura de los paquetes de favoritos de la base de datos
	 */
	const loadFavoritePackages = useCallback(() => {
		adtController
			.getFavoritePackages(session.email)
			.then((responseFavorite) => {
				if (responseFavorite.isSuccess) {
					let favoritePackages =
						responseFavorite.getValue() as ADTFavoritePackages;
					adtActions.setFavoritePackages(favoritePackages);
				} else {
					showMessage(
						getI18nText("adtIde.favoritePackages.errorLoad"),
						MessageType.error
					);
				}
			});
	}, []);

	return { loadInitialData };
}
