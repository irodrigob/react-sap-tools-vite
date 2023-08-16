import {
  Message,
  Messages,
  MessageType,
  SAPMessageType,
} from "messageManager/infraestructure/types/msgManagerTypes";
import MessageManagerActions from "messageManager/infraestructure/storage/messageManagerActions";
import AppStore from "shared/storage/appStore";
import { ReturnsDTO, ReturnDTO } from "shared/dto/generalDTO";
export default class MessageManagerApplication {
  private messageManagerActions: MessageManagerActions;
  private appStore: AppStore;

  constructor() {
    this.appStore = new AppStore();
    this.messageManagerActions = new MessageManagerActions();
  }
  /**
   * Añade mensajes al modelo
   * @param messages | Array mensajes
   * @param keepPreviousMessage | Mantener los previos
   */
  addMessages(messages: Messages, keepPreviousMessage: boolean = false) {
    let newMessages = [...messages];
    if (keepPreviousMessage)
      newMessages.concat(this.appStore.getState().MessageManager.messages);

    this.messageManagerActions.setMessages(newMessages);
    this.messageManagerActions.setMessagesNumber(newMessages.length);
    this.messageManagerActions.setUnreadMessage(true);
  }
  /**
   * Añade mensajes devueltos por el array ReturnDTO de SA^P
   * @param sapReturn | Lista de mensaje en formato SAP
   * @param keepPreviousMessage | Mantener la lista de mensajes previo
   */
  addFromSAPArrayReturn(
    sapReturn: ReturnsDTO,
    keepPreviousMessage: boolean = false
  ) {
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

    this.addMessages(newMessages, keepPreviousMessage);
  }
  /**
   * Devuelve si hay mensajes erróneos.
   * @returns | Booleano si hay mensajes con error
   */
  existErrors(): boolean {
    return this.appStore
      .getState()
      .MessageManager.messages.findIndex(
        (row) => row.type == MessageType.error
      ) == -1
      ? false
      : true;
  }
}
