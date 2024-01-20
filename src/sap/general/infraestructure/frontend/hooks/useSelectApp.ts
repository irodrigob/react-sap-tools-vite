import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
import SAPTranslateController from "sap/translate/infraestructure/controller/sapTranslateController";
import SAPTransportOrderController from "sap/transportOrder/infraestructure/controller/sapTransportOrderController";
import useSAPGeneralStore from "./useSAPGeneralStore";

export default function useSelectApp() {
	const { setExpandSidebar, setShowSidebar } = useSystemData();
	const navigate = useNavigate();
	const messageController = new MessageManagerController();
	const sapTranslateController = new SAPTranslateController();
	const sapTransportOrderController = new SAPTransportOrderController();
	const { setApplicationChangedAction } = useSAPGeneralStore();

	const appSelected = useCallback((frontendPage: string, app: string) => {
		// Estos dos set no sirven para nada porque no se usan, pero lo dejo por
		// si algun día quiero volverlo a usar. Y no lo quito, porque me olvidaré de él.
		setExpandSidebar(true);
		setShowSidebar(true);

		// Limpieza de variable
		messageController.clearVariables();
		sapTranslateController.clearVariables();
		sapTransportOrderController.clearVariables();

		// Se indica que hay cambio de aplicación
		setApplicationChangedAction(true);

		navigate(frontendPage);
	}, []);

	return { appSelected };
}
