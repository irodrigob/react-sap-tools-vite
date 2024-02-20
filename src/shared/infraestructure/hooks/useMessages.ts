import { useCallback } from "react";
import {
	Id,
	toast,
	ToastOptions,
	TypeOptions,
	UpdateOptions,
} from "react-toastify";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import ErrorGeneral from "shared/errors/errorGeneral";
import { useTranslations } from "translations/i18nContext";

export enum MessageType {
	error = "E",
	warning = "W",
	success = "S",
	info = "I",
}

export const DEFAULT_TOAST: ToastOptions = {
	position: "top-right",
	autoClose: 5000,
	theme: "dark",
};

/**
 * Convierte el tipo de mensaje de la aplicación al tipo del toast
 * @param msgType | Tipo de mensaje de la aplicación
 * @returns Tipo de mensaje del toast
 */
const convertMsgTypeAppToToast = (msgType: MessageType): TypeOptions => {
	switch (msgType) {
		case MessageType.success:
			return "success";
		case MessageType.error:
			return "error";
		case MessageType.info:
			return "info";
		case MessageType.warning:
			return "warning";
		default:
			return "success";
	}
};

export default function useMessages() {
	const { getI18nText } = useTranslations();

	/**
	 * Función que muestra el mensaje principal de error
	 * @param result | Objeto de error general o graphql
	 */
	const showResultError = useCallback((result: ErrorGeneral | ErrorGraphql) => {
		let error = result.getError();
		if (error.i18nText && error.i18nText != "") {
			showMessage(getI18nText(error.i18nText as string), MessageType.error);
		} else {
			showMessage(
				getI18nText(error.singleMessage as string),
				MessageType.error
			);
		}
	}, []);

	/**
	 *
	 * @param id | Id de mensaje
	 * @param result | Objeto de error general o graphql
	 */
	const updateResultError = useCallback(
		(id: Id, result: ErrorGeneral | ErrorGraphql) => {
			let error = result.getError();
			if (error.i18nText && error.i18nText != "") {
				updateMessage(
					id,
					getI18nText(error.i18nText as string),
					MessageType.error
				);
			} else {
				updateMessage(
					id,
					getI18nText(error.singleMessage as string),
					MessageType.error
				);
			}
		},
		[]
	);

	/**
	 * Muestra un mensaje
	 * @param message | Mensaje
	 * @param type | Tipo de mensake
	 * @param pParams | Parametros del mes
	 * @returns | Objeto toast
	 */
	const showMessage = useCallback(
		(
			message: string,
			type: MessageType = MessageType.success,
			pParams?: ToastOptions
		): Id => {
			let params = {
				...DEFAULT_TOAST,
				...pParams,
				type: convertMsgTypeAppToToast(type),
			};
			return toast(message, params);
		},
		[]
	);
	/**
	 * Muestra un mensaje
	 * @param id | Id del mensaje ha actualizar
	 * @param sMessage | Mensaje
	 * @param pType | Tipo de mensake
	 * @param pParams | Parametros del mes
	 */
	const updateMessage = useCallback(
		(
			id: Id,
			message: string,
			type: MessageType = MessageType.success,
			pParams?: UpdateOptions
		) => {
			let params: UpdateOptions = {
				...DEFAULT_TOAST,
				...pParams,
				isLoading: pParams?.isLoading ? pParams.isLoading : false,
				type: convertMsgTypeAppToToast(type),
				render: message,
			};
			toast.update(id, params);
		},
		[]
	);
	/**
	 * Convierte el tipo de mensaje que devuelve los sistemas de SAP al de aplicación
	 * @param msgTypeSAP | Tipo de mensaje SAP
	 * @returns | Tipo de mensaje la aplicación
	 */
	const convertServiceSAPMsgType = useCallback(
		(msgTypeSAP: string): MessageType => {
			switch (msgTypeSAP) {
				case "E":
					return MessageType.error;
				case "I":
					return MessageType.info;
				case "W":
					return MessageType.warning;
				case "S":
					return MessageType.success;
				default:
					return MessageType.success;
			}
		},
		[]
	);

	return {
		showResultError,
		showMessage,
		convertServiceSAPMsgType,
		updateMessage,
		updateResultError,
	};
}
