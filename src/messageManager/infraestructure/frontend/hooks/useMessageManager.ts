import { useCallback } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import { MessageType } from "messageManager/infraestructure/types/msgManagerTypes";
import { useAppSelector } from "shared/storage/useStore";

export default function useMessageManager() {
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

  return {
    messages,
    messagesNumber,
    unreadMessage,
    convertMsgType2ValueState,
    determineGlobalValueState,
  };
}
