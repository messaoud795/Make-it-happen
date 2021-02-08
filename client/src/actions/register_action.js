import { REGISTER_SUCCESS } from "./actionsTypes";
import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "./async_actions";

export const register_action = (inputs) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const data = await axios.post("/api/user/register", inputs);
      await dispatch({ type: REGISTER_SUCCESS, payload: data });
      dispatch(asyncActionFinish());
      toastr.success("Success!", "your account has been created");
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("Oops!", "an error has occured");
    }
  };
};
