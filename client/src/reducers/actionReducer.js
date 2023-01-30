import { parseISO } from "date-fns";
import {
  ACTION_ACTION_ERROR,
  ACTION_ACTION_START,
  ACTION_ADD_SUCCESS,
  ACTION_DELETE_SUCCESS,
  ACTION_EDIT_SUCCESS,
  ACTION_LOAD_SUCCESS,
  TODAYACTION_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialState = {
  actions: null,
  loadingAction: false,
  error: null,
  todayActions: [],
  completedActionsOfToday: 0,
};

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
        todayActions: payload,
        completedActionsOfToday: getCompletedActionsOfToday(payload),
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

const getCompletedActionsOfToday = (actions) => {
  return actions?.filter((action) => {
    const {
      completed: { status, completionDate },
    } = action;
    return (
      status &&
      parseISO(completionDate).toLocaleDateString() ===
        new Date().toLocaleDateString()
    );
  }).length;
};
