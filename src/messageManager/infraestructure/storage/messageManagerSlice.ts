import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Messages } from "messageManager/infraestructure/types/msgManagerTypes";

interface MessageManagerRedux {
  messages: Messages;
  messagesNumber: number;
  unreadMessage: boolean;
}

const initialState: MessageManagerRedux = {
  messages: [],
  messagesNumber: 0,
  unreadMessage: false,
};

export const MessageManagerSlice = createSlice({
  name: "messageManager",
  initialState: initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Messages>) => {
      state.messages = action.payload;
    },
    setMessagesNumber: (state, action: PayloadAction<number>) => {
      state.messagesNumber = action.payload;
    },
    setUnreadMessage: (state, action: PayloadAction<boolean>) => {
      state.unreadMessage = action.payload;
    },
  },
});

export const { setMessages, setMessagesNumber, setUnreadMessage } =
  MessageManagerSlice.actions;

export default MessageManagerSlice.reducer;
