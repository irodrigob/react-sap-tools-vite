export enum MessageType {
  error = "E",
  warning = "W",
  success = "S",
  info = "I",
}

export enum SAPMessageType {
  error = "E",
  warning = "W",
  success = "S",
  info = "I",
}

export interface Message {
  type: MessageType;
  message: string;
  subMessage: string;
}
export type Messages = Message[];
