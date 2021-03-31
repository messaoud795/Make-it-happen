import {
  CHAT_ACTION_ERROR,
  CHAT_ACTION_START,
  CHAT_ADD_SUCCESS,
  CHAT_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialstate = { chats: [], loadingMsgs: false, error: null };

export const chatReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHAT_ACTION_START:
      return (state = { ...state, loadingMsgs: true });
    case CHAT_LOAD_SUCCESS:
      //sorting msgs of every chat according to the timestamp
      return (state = { error: null, chats: payload, loadingMsgs: false });

    case CHAT_ADD_SUCCESS:
      let updatedChat = state.chats.filter(
        (chat) => chat._id === payload.chatId._id
      )[0];
      updatedChat.messages = [...updatedChat.messages, payload.msg];
      console.log(updatedChat);
      return (state = {
        chats: [
          ...state.chats.filter((chat) => chat._id !== payload.chatId._id),
          updatedChat,
        ],
        loadingMsgs: false,
        error: null,
      });

    case CHAT_ACTION_ERROR:
      return (state = { ...state, loadingMsgs: false, error: payload.error });
    default:
      return state;
  }
};
