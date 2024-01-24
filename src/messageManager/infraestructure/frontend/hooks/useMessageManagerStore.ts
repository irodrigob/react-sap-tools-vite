import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
	setMessages,
	setMessagesNumber,
	setUnreadMessage,
} from "messageManager/infraestructure/storage/messageManagerSlice";
import { Messages } from "messageManager/infraestructure/types/msgManagerTypes";

export default function useMessageManagerStore() {
	const dispatch = useDispatch();

	const setMessagesAction = useCallback((messages: Messages) => {
		dispatch(setMessages(messages));
	}, []);
	const setMessagesNumberAction = useCallback((value: number) => {
		dispatch(setMessagesNumber(value));
	}, []);
	const setUnreadMessageAction = useCallback((value: boolean) => {
		dispatch(setUnreadMessage(value));
	}, []);
	const clearVariables = useCallback(() => {
		setMessagesAction([]);
		setMessagesNumberAction(0);
		setUnreadMessageAction(false);
	}, []);

	return {
		setMessagesAction,
		setMessagesNumberAction,
		setUnreadMessageAction,
		clearVariables,
	};
}
