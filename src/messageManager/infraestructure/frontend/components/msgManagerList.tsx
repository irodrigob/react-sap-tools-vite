import { FC } from "react";
import { MessageView, MessageItem } from "@ui5/webcomponents-react";
import {
  Messages,
  Message,
} from "messageManager/infraestructure/types/msgManagerTypes";
import useMessageManager from "messageManager/infraestructure/frontend/hooks/useMessageManager";
interface Props {
  messages: Messages;
}

const MessagesList: FC<Props> = (props) => {
  const { messages } = props;
  const { convertMsgType2ValueState } = useMessageManager();

  return (
    <MessageView showDetailsPageHeader={true}>
      {props.messages.map((row: Message, index) => {
        return (
          <MessageItem
            key={`MSG_${index}`}
            titleText={row.message}
            subtitleText={row.subMessage}
            type={convertMsgType2ValueState(row.type)}
          >
            {""}
          </MessageItem>
        );
      })}
    </MessageView>
  );
};

export default MessagesList;
