import axios from "axios";
import { toastr } from "react-redux-toastr";
import {
  GOAL_ACTION_ERROR,
  GOAL_ACTION_START,
  GOAL_ADD_SUCCESS,
  GOAL_LOAD_SUCCESS,
} from "./actionsTypes";
import { configHeaders } from "./config";

export const addGoal = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      await axios.post("/api/goal/add", data, configHeaders());
      dispatch({ type: GOAL_ADD_SUCCESS });
      toastr.success("Success", " A new goal is created");
      dispatch(loadGoals(data.fieldId));
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR, payload: error });
      toastr.error("Error", "Goal is not created");
    }
  };
};

export const loadGoals = (fieldId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      const { data } = await axios.get(`/api/goal/${fieldId}`, configHeaders());
      dispatch({ type: GOAL_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR, payload: error });
    }
  };
};
