import { FC, useEffect, useState } from "react";
import { ValueState } from "@ui5/webcomponents-react";
import {
  MessageViewButton,
  Popover,
} from "@ui5/webcomponents-react";
import MessagesList from "./msgManagerList";
import useMessageManager from "messageManager/infraestructure/frontend/hooks/useMessageManager";

const MsgManagerToolbarContainer: FC = () => {
  const [msgType, setMsgType] = useState(ValueState.None);
  const { messages, messagesNumber, determineGlobalValueState } =
    useMessageManager();
  const [openMessageView, setOpenMessageView] = useState(false);

  /*************************************
   * Efectos
   ************************************/
  useEffect(() => {
    setMsgType(determineGlobalValueState());
  }, [messages]);

  return (
    <>
      <MessageViewButton
        counter={messagesNumber}
        type={msgType}
        id="btnMessageManager"
        onClick={() => {
          setOpenMessageView(true);
        }}
      />
      <Popover
        opener="btnMessageManager"
        open={openMessageView}
        placementType="Bottom"
        onAfterClose={() => {
          setOpenMessageView(false);
        }}
      >
        <MessagesList messages={messages} />
      </Popover>
    </>
  );
};

export default MsgManagerToolbarContainer;
