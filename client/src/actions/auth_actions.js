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
import {
  PROFILE_LOAD_SUCCESS,
  PROFILE_LOAD_START,
  PROFILE_LOAD_ERROR,
} from "./actionsTypes";

import { configHeaders } from "./config";

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
      toastr.error("error", error);
    }
  };
};

export const google_login = (tokenId) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const data = await axios.post("/api/user/google_login", tokenId);
      await dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      toastr.error("error", error);
    }
  };
};

export const facebook_login = (inputs) => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
      const data = await axios.post("/api/user/facebook_login", inputs);
      await dispatch({ type: LOGIN_SUCCESS, payload: data });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
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

export const loadProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROFILE_LOAD_START });
      let { data } = await axios.get("/api/user/profile", configHeaders());
      dispatch({ type: PROFILE_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PROFILE_LOAD_ERROR });
    }
  };
};
