import {
  CHAT_ACTION_ERROR,
  CHAT_ACTION_START,
  CHAT_ADD_SUCCESS,
  CHAT_LOAD_SUCCESS,
  CHAT_RESET_NOTIF,
} from "../actions/actionsTypes";

const initialstate = { chats: [], loadingMsgs: false, error: null, notif: 0 };

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
        notif: 0,
      });

    case CHAT_ADD_SUCCESS:
      let updatedChat = state.chats.filter(
        (chat) => chat._id === payload.chatId._id
      )[0];
      if (updatedChat)
        updatedChat.messages = [...updatedChat.messages, payload.msg];
      console.log(updatedChat);
      return (state = {
        chats: [
          ...state.chats.filter((chat) => chat._id !== payload.chatId._id),
          updatedChat,
        ],
        loadingMsgs: false,
        error: null,
        notif: state.notif + 1,
      });
    case CHAT_RESET_NOTIF:
      return (state = { ...state, notif: 0 });

    case CHAT_ACTION_ERROR:
      return (state = { ...state, loadingMsgs: false, error: payload.error });
    default:
      return state;
  }
};
