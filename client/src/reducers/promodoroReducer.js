import {
  PROMODORO_ACTION_ERROR,
  PROMODORO_ACTION_START,
  PROMODORO_ADD_SUCCESS,
  PROMODORO_LOAD_SUCCESS,
  PROMODORO_UPDATE_SUCCESS,
} from "../actions/actionsTypes";

const initialState = {
  loadingPromodoro: false,
  error: null,
  results: null,
  goal: 40,
};

export const promodoroReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROMODORO_ACTION_START:
      return (state = { ...state, loadingPromodoro: true });
    case PROMODORO_ACTION_ERROR:
      return (state = { ...state, loadingPromodoro: false, error: payload });
    case PROMODORO_LOAD_SUCCESS:
      return (state = {
        loadingPromodoro: false,
        record: payload,
        error: null,
      });
    case PROMODORO_ADD_SUCCESS:
      return (state = {
        ...state,
        loadingPromodoro: false,
        error: null,
      });
    case PROMODORO_UPDATE_SUCCESS:
      return (state = { ...state, loadingPromodoro: false, error: null });
    default:
      return state;
  }
};
