import AppStore from "shared/storage/appStore";
import {
  setMessages,
  setMessagesNumber,
  setUnreadMessage,
} from "messageManager/infraestructure/storage/messageManagerSlice";

import { Messages } from "messageManager/infraestructure/types/msgManagerTypes";

export default class MessageManagerActions extends AppStore {
  setMessages(messages: Messages) {
    this.dispatch(setMessages(messages));
  }
  setMessagesNumber(value: number) {
    this.dispatch(setMessagesNumber(value));
  }
  setUnreadMessage(value: boolean) {
    this.dispatch(setUnreadMessage(value));
  }
}
