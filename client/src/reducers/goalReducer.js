import {
  GOAL_ACTION_ERROR,
  GOAL_ACTION_START,
  GOAL_ADD_SUCCESS,
  GOAL_DELETE_SUCCESS,
  GOAL_EDIT_SUCCESS,
  GOAL_LOAD_SUCCESS,
  GOAL_PARTNERS_SUCCESS,
} from "../actions/actionsTypes";

const initialState = {
  goals: null,
  loadingGoal: false,
  error: null,
  partners: null,
};

export const goalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GOAL_ACTION_START:
      return (state = { ...state, loadingGoal: true });
    case GOAL_LOAD_SUCCESS:
      return (state = {
        loadingGoal: false,
        error: null,
        goals: payload,
      });
    case GOAL_PARTNERS_SUCCESS:
      return (state = {
        ...state,
        loadingGoal: false,
        error: null,
        partners: payload,
      });
    case GOAL_ADD_SUCCESS:
      return (state = { ...state, loadingGoal: false, error: null });
    case GOAL_DELETE_SUCCESS:
      return (state = { ...state, loadingGoal: false, error: null });
    case GOAL_EDIT_SUCCESS:
      return (state = { ...state, loadingGoal: false, error: null });
    case GOAL_ACTION_ERROR:
      return (state = { ...state, loadingGoal: false, error: payload });

    default:
      return state;
  }
};
