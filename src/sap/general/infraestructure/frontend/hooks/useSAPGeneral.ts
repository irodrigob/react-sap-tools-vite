import { useCallback } from "react";
import SAPController from "sap/general/infraestructure/controller/sapController";
import { ResponseMetadata } from "sap/general/infraestructure/types/general";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import useMessages from "shared/infraestructure/hooks/useMessages";

export default function useSAPGeneral() {
	const sapController = new SAPController();
	const { showResultError, showMessage } = useMessages();

	const initialServicesSAPTools = useCallback(() => {
		sapController.callMetadata().then((responseMetadata: ResponseMetadata) => {
			if (responseMetadata.isSuccess) {
			} else {
				showResultError(responseMetadata.getErrorValue() as ErrorGraphql);
			}
		});
	}, []);

	return { initialServicesSAPTools };
}
