import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";
import { useTranslations } from "translations/i18nContext";
import { useSession } from "auth/authProvider";
import useMessages, {
	MessageType,
} from "shared/infraestructure/hooks/useMessages";
import { ADTFavoritePackages } from "sap/adt/domain/entities/favoritePackage";
import useSAPGeneralStore from "sap/general/infraestructure/frontend/hooks/useSAPGeneralStore";
import useAdtStore from "./useAdtStore";
import { ResponseRepositoryCheckRuns } from "sap/adt/infraestructure/types/adt";
import useSAPGeneral from "sap/general/infraestructure/frontend/hooks/useSAPGeneral";
import { ADTRepositoryCheckRuns } from "@/sap/adt/domain/entities/repositoryCheckRun";

export default function useAdt() {
	const adtController = new SAPAdtController();
	const { getI18nText } = useTranslations();
	const { session } = useSession();
	const { showMessage } = useMessages();
	const { setSystemChangedAction, setApplicationChangedAction } =
		useSAPGeneralStore();
	const { setFavoritePackagesAction, setRepositoryCheckRunsAction } =
		useAdtStore();
	const { getDataForConnection } = useSAPGeneral();

	/**
	 * Lectura inicial de datos
	 */
	const loadInitialData = useCallback(() => {
		setSystemChangedAction(false);
		setApplicationChangedAction(false);

		loadFavoritePackages();
		loadRepositoryCheckRun();
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
					setFavoritePackagesAction(favoritePackages);
				} else {
					showMessage(
						getI18nText("adtIde.favoritePackages.errorLoad"),
						MessageType.error
					);
				}
			});
	}, []);
	/**
	 * Obtiene los tipos de objetos del repository a los cuales se les puede validar su contenido.
	 */
	const loadRepositoryCheckRun = useCallback(() => {
		adtController
			.repositoryCheckRun(getDataForConnection("base"))
			.then((reponse: ResponseRepositoryCheckRuns) => {
				if (reponse.isSuccess) {
					setRepositoryCheckRunsAction(
						reponse.getValue() as ADTRepositoryCheckRuns
					);
				}
			});
	}, []);

	return { loadInitialData, loadRepositoryCheckRun };
}
