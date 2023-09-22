import { useTranslations } from "translations/i18nContext";
import { ObjectsText } from "sap/translate/infraestructure/types/translate.d";
export default function useToolbarTable() {
	const { getI18nText } = useTranslations();

	/**
	 * Gestiona añadir objetos a una orden
	 * @param selectedObjectText | Objetos seleccionados
	 */
	const handlerAddObjects = (selectedObjectText: ObjectsText) => () => {
		console.log(selectedObjectText);
	};

	return { handlerAddObjects };
}
