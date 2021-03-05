import {
  ACTION_ACTION_ERROR,
  ACTION_ACTION_START,
  ACTION_ADD_SUCCESS,
  ACTION_DELETE_SUCCESS,
  ACTION_EDIT_SUCCESS,
  ACTION_LOAD_SUCCESS,
  TODAYACTION_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialState = { actions: null, loadingAction: false, error: null };

export const ActionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_ACTION_START:
      return (state = { ...state, loadingAction: true });
    case ACTION_LOAD_SUCCESS:
      return (state = {
        loadingAction: false,
        error: null,
        actions: payload,
      });
    case TODAYACTION_LOAD_SUCCESS:
      return (state = {
        loadingAction: false,
        error: null,
        actions: payload,
      });
    case ACTION_ADD_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case ACTION_DELETE_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case ACTION_EDIT_SUCCESS:
      return (state = { ...state, loadingAction: false, error: null });
    case ACTION_ACTION_ERROR:
      return (state = { ...state, loadingAction: false, error: payload });

    default:
      return state;
  }
};
