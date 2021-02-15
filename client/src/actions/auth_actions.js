import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "./actionsTypes";
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

export const login_action = (inputs) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const data = await axios.post("/api/user/login", inputs);
      await dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
      toastr.error("error", error);
    }
  };
};
export const logout_action = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      await dispatch({ type: LOGOUT_SUCCESS });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("error", error);
    }
  };
};
