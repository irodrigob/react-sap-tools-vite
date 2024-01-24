import { useCallback } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import {
	Message,
	Messages,
	MessageType,
	SAPMessageType,
} from "messageManager/infraestructure/types/msgManagerTypes";
import { useAppSelector } from "shared/storage/useStore";
import useMessageManagerStore from "./useMessageManagerStore";
import { ReturnsDTO, ReturnDTO } from "shared/dto/generalDTO";

export default function useMessageManager() {
	const { setMessagesAction, setMessagesNumberAction, setUnreadMessageAction } =
		useMessageManagerStore();
	const { messages, messagesNumber, unreadMessage } = useAppSelector(
		(state) => state.MessageManager
	);

	/**
	 * Convierte el tipo de mensaje de aplicación por el ValueState de UI5.
	 */
	const convertMsgType2ValueState = useCallback(
		(messageType: MessageType): ValueState => {
			switch (messageType) {
				case MessageType.error:
					return ValueState.Error;
				case MessageType.info:
					return ValueState.Information;
				case MessageType.warning:
					return ValueState.Warning;
				case MessageType.success:
					return ValueState.Success;
				default:
					return ValueState.None;
			}
		},
		[]
	);

	/**
	 * Determina el ValueState global que sea más restrictivo
	 */
	const determineGlobalValueState = useCallback(() => {
		if (messages.length > 0) {
			if (messages.find((row) => row.type == MessageType.error))
				return convertMsgType2ValueState(MessageType.error);
			else if (messages.find((row) => row.type == MessageType.info))
				return convertMsgType2ValueState(MessageType.info);
			else if (messages.find((row) => row.type == MessageType.warning))
				return convertMsgType2ValueState(MessageType.warning);
			else if (messages.find((row) => row.type == MessageType.success))
				return convertMsgType2ValueState(MessageType.success);
			else return ValueState.None;
		} else {
			return ValueState.None;
		}
	}, [messages]);

	/**
	 * Añade mensajes al modelo
	 * @param messages | Array mensajes
	 * @param keepPreviousMessage | Mantener los previos
	 */
	const addMessages = useCallback(
		(messages: Messages, keepPreviousMessage: boolean = false) => {
			let newMessages = [...messages];
			if (keepPreviousMessage) newMessages.concat(messages);

			setMessagesAction(newMessages);
			setMessagesNumberAction(newMessages.length);
			setUnreadMessageAction(true);
		},
		[messages, messagesNumber, unreadMessage]
	);
	/**
	 * Añade mensajes devueltos por el array ReturnDTO de SA^P
	 * @param sapReturn | Lista de mensaje en formato SAP
	 * @param keepPreviousMessage | Mantener la lista de mensajes previo
	 */
	const addFromSAPArrayReturn = useCallback(
		(sapReturn: ReturnsDTO, keepPreviousMessage: boolean = false) => {
			let newMessages: Messages;

			newMessages = sapReturn.map((row: ReturnDTO) => {
				let msgType: MessageType = MessageType.success;
				switch (row.type) {
					case SAPMessageType.error:
						msgType = MessageType.error;
						break;
					case SAPMessageType.info:
						msgType = MessageType.info;
						break;
					case SAPMessageType.warning:
						msgType = MessageType.warning;
						break;
					case SAPMessageType.success:
						msgType = MessageType.success;
						break;
				}
				return { type: msgType, message: row.message } as Message;
			});

			addMessages(newMessages, keepPreviousMessage);
		},
		[messages, messagesNumber, unreadMessage]
	);
	/**
	 * Devuelve si hay mensajes erróneos.
	 * @returns | Booleano si hay mensajes con error
	 */
	const existErrors = useCallback((): boolean => {
		return messages.findIndex((row) => row.type == MessageType.error) == -1
			? false
			: true;
	}, [messages]);

	return {
		messages,
		messagesNumber,
		unreadMessage,
		convertMsgType2ValueState,
		determineGlobalValueState,
		addMessages,
		addFromSAPArrayReturn,
		existErrors,
	};
}
