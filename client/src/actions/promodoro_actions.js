import {
  PROMODORO_ACTION_ERROR,
  PROMODORO_ACTION_START,
  PROMODORO_ADD_SUCCESS,
  PROMODORO_LOAD_SUCCESS,
  PROMODORO_UPDATE_SUCCESS,
} from "./actionsTypes";
import axios from "axios";
import { configHeaders } from "./config";

export const addDistractions = (result) => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROMODORO_ACTION_START });
      await axios.post("/api/promodoro/add", result, configHeaders());
      dispatch({ type: PROMODORO_ADD_SUCCESS });
      await dispatch(loadPromodoro());
    } catch (error) {
      dispatch({ type: PROMODORO_ACTION_ERROR });
    }
  };
};

export const updateDistractions = (result) => async (dispatch) => {
  try {
    dispatch({ type: PROMODORO_ACTION_START });
    await axios.post("/api/promodoro/update", result, configHeaders());
    dispatch({ type: PROMODORO_UPDATE_SUCCESS });
    await dispatch(loadPromodoro());
  } catch (error) {
    dispatch({ type: PROMODORO_ACTION_ERROR });
  }
};
export const loadPromodoro = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: PROMODORO_ACTION_START });
      let { data } = await axios.get("/api/promodoro/", configHeaders());
      dispatch({ type: PROMODORO_LOAD_SUCCESS, payload: data.distractions });
    } catch (error) {
      dispatch({ type: PROMODORO_ACTION_ERROR });
    }
  };
};
