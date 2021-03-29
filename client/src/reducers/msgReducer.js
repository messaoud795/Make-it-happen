import {
  MSG_ACTION_ERROR,
  MSG_ACTION_START,
  MSG_ADD_SUCCESS,
  MSG_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialstate = { msgs: [], chats: [], loadingMsgs: false, error: null };

export const MsgReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case MSG_ACTION_START:
      return (state = { ...state, loadingMsgs: true });
    case MSG_LOAD_SUCCESS:
      return (state = { ...state, name: payload, loadingField: false });

    case MSG_ADD_SUCCESS:
      return (state = { ...state, loadingMsgs: false });

    case MSG_ACTION_ERROR:
      return (state = { ...state, loadingMsgs: false, error: payload.error });
    default:
      return state;
  }
};
