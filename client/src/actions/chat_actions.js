import {
  CHAT_ACTION_ERROR,
  CHAT_LOAD_SUCCESS,
  CHAT_ACTION_START,
} from "./actionsTypes";
import { configHeaders } from "./config";
import axios from "axios";

export const addMsg = (input) => {
  return async (dispatch) => {
    try {
      dispatch({ type: CHAT_ACTION_START });
      await axios.post("/api/msg/add", input, configHeaders());
    } catch (error) {
      dispatch({ type: CHAT_ACTION_ERROR, payload: error });
    }
  };
};

export const loadChats = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: CHAT_ACTION_START });
      let { data } = await axios.get("/api/msg/", configHeaders());
      dispatch({ type: CHAT_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CHAT_ACTION_ERROR, payload: error });
    }
  };
};
