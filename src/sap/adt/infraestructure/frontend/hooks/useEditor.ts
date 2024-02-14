import { useCallback } from "react";
import SAPAdtController from "sap/adt/infraestructure/controller/sapAdtController";

export default function useEditor() {
	const adtController = new SAPAdtController();
	const getObjectContent = useCallback(() => {}, []);
}
