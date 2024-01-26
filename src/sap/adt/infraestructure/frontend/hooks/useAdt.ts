import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
import ADTActions from "sap/adt/infraestructure/storage/adtActions";
import { useSession } from "auth/authProvider";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { ADTFavoritePackages } from "sap/adt/domain/entities/favoritePackage";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";

export default function useAdt() {
	const adtController = new SAPAdtController();
	const { getI18nText, language } = useTranslations();
	const adtActions = new ADTActions();
	const { session } = useSession();
	const { showMessage } = useMessages();
	const { setSystemChangedAction, setApplicationChangedAction } =
		useSAPGeneralStore();
	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		setSystemChangedAction(false);
		setApplicationChangedAction(false);

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
