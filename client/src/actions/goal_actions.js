import axios from "axios";
import { parseISO } from "date-fns";
import { toastr } from "react-redux-toastr";
import {
  GOAL_ACTION_ERROR,
  GOAL_ACTION_START,
  GOAL_ADD_SUCCESS,
  GOAL_DELETE_SUCCESS,
  GOAL_EDIT_SUCCESS,
  GOAL_LOAD_SUCCESS,
  GOAL_PARTNERS_SUCCESS,
} from "./actionsTypes";
import { configHeaders } from "./config";

export const addGoal = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      await axios.post("/api/goal/add", data, configHeaders());
      dispatch({ type: GOAL_ADD_SUCCESS });
      toastr.success("Success", " A new goal is created");
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
      for (var i in data) {
        data[i].startDate = parseISO(data[i].startDate);
        data[i].endDate = parseISO(data[i].endDate);
      }

      dispatch({ type: GOAL_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR, payload: error });
    }
  };
};

export const editGoal = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      await axios.patch("/api/goal/edit", data, configHeaders());
      dispatch({ type: GOAL_EDIT_SUCCESS });
      toastr.success("Success", "Goal is updated");
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR, payload: error });
      toastr.error("Error", "Goal is not updated");
    }
  };
};

export const deleteGoal = (goalId, fieldId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      await axios.delete(`/api/goal/delete/${goalId}`, configHeaders());
      dispatch({ type: GOAL_DELETE_SUCCESS });
      toastr.success("Success", "Goal is deleted");
      dispatch(loadGoals(fieldId));
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR });
      toastr.error("Error", "Goal is not deleted");
    }
  };
};

export const goalPartners = (goalId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GOAL_ACTION_START });
      let { data } = await axios.get(
        `/api/goal/partners/${goalId}`,
        configHeaders()
      );
      dispatch({ type: GOAL_PARTNERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GOAL_ACTION_ERROR });
    }
  };
};
