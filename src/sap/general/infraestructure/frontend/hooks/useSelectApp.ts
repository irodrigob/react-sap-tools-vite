import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import useSAPGeneralStore from "./useSAPGeneralStore";
import useSAPTransportOrderStore from "sap/transportOrder/infraestructure/frontend/hooks/useSAPTransportOrderStore";
import useAdtStore from "sap/adt/infraestructure/frontend/hooks/useAdtStore";

export default function useSelectApp() {
	const { setExpandSidebar, setShowSidebar } = useSystemData();
	const navigate = useNavigate();
	const { setApplicationChangedAction } = useSAPGeneralStore();
	const { clearVariables: sapTransportOrderClearVariables } =
		useSAPTransportOrderStore();

	const appSelected = useCallback((frontendPage: string, app: string) => {
		// Estos dos set no sirven para nada porque no se usan, pero lo dejo por
		// si algun día quiero volverlo a usar. Y no lo quito, porque me olvidaré de él.
		setExpandSidebar(true);
		setShowSidebar(true);

		// Limpieza de variable
		sapTransportOrderClearVariables();

		// Se indica que hay cambio de aplicación
		setApplicationChangedAction(true);

		navigate(frontendPage);
	}, []);

	return { appSelected };
}
