import { MessageType } from "messageManager/infraestructure/types/msgManagerTypes";

export default class Message {
  readonly type: MessageType;
  readonly message: string;
  readonly subMessage: string;

  constructor(type: MessageType, message: string, subMessage: string) {
    this.message = message;
    this.type = type;
    this.subMessage = subMessage;
  }
}
