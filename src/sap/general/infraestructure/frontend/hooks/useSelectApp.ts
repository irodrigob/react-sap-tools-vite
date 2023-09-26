import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import SAPGeneralActions from "sap/general/infraestructure/storage/SAPGeneralActions";
import MessageManagerController from "messageManager/infraestructure/controller/messageManagerController";
export default function useSelectApp() {
	const { setExpandSidebar, setShowSidebar } = useSystemData();
	const navigate = useNavigate();
	const sapGeneralActions = new SAPGeneralActions();
	const messageController = new MessageManagerController();

	const appSelected = useCallback((frontendPage: string, app: string) => {
		// Estos dos set no sirven para nada porque no se usan, pero lo dejo por
		// si algun día quiero volverlo a usar. Y no lo quito, porque me olvidaré de él.
		setExpandSidebar(true);
		setShowSidebar(true);

		// Limpieza de variable
		messageController.clearVariables();

		// Se indica que hay cambio de aplicación
		sapGeneralActions.setApplicationChanged(true);

		navigate(frontendPage);
	}, []);

	return { appSelected };
}
