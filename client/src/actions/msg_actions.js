import {
  MSG_ACTION_ERROR,
  MSG_ADD_SUCCESS,
  MSG_LOAD_SUCCESS,
  MSG_ACTION_START,
} from "./actionsTypes";
import { configHeaders } from "./config";
import axios from "axios";
import Pusher from "pusher-js";

export const addMsg = (input) => {
  const pusher = new Pusher("22769e8d448bb4cddf2c", {
    cluster: "eu",
  });

  const channel = pusher.subscribe("chats");
  return async (dispatch) => {
    try {
      dispatch({ type: MSG_ACTION_START });
      await axios.post("/api/msg/add", input, configHeaders());
      await channel.bind("updated", function (data) {
        dispatch({ type: MSG_ADD_SUCCESS, payload: data });
      });
      channel.unbind_all();
      channel.unsubscribe();
    } catch (error) {
      dispatch({ type: MSG_ACTION_ERROR, payload: error });
    }
  };
};

export const loadMsg = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: MSG_ACTION_START });
      let { data } = await axios.get("/api/msg/", configHeaders());
      dispatch({ type: MSG_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: MSG_ACTION_ERROR, payload: error });
    }
  };
};
