import {
  CHAT_ACTION_ERROR,
  CHAT_ACTION_START,
  CHAT_ADD_SUCCESS,
  CHAT_LOAD_SUCCESS,
  CHAT_RESET_NOTIF,
} from "../actions/actionsTypes";

const initialstate = { chats: [], loadingMsgs: false, error: null };

export const chatReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHAT_ACTION_START:
      return (state = { ...state, loadingMsgs: true });
    case CHAT_LOAD_SUCCESS:
      return (state = {
        error: null,
        chats: payload,
        loadingMsgs: false,
      });

    case CHAT_ADD_SUCCESS:
      let updatedChat = state.chats.filter(
        (chat) => chat._id === payload.chatId
      )[0];

      if (
        updatedChat &&
        updatedChat.messages[updatedChat.messages.length - 1]._id !==
          payload.msg._id
      )
        updatedChat.messages = [...updatedChat.messages, payload.msg];
      return (state = {
        chats: [
          ...state.chats.filter((chat) => chat._id !== payload.chatId),
          updatedChat,
        ],
        loadingMsgs: false,
        error: null,
      });
    case CHAT_RESET_NOTIF:
      return (state = { ...state, notif: 0 });

    case CHAT_ACTION_ERROR:
      return (state = { ...state, loadingMsgs: false, error: payload.error });
    default:
      return state;
  }
};
