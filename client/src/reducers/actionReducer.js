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
      return {
        ...state,
        loadingAction: true,
        error: null,
      };

    case ACTION_LOAD_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        error: null,
        actions: payload,
      };

    case TODAYACTION_LOAD_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        error: null,
        todayActions: payload,
        completedActionsOfToday: getCompletedActionsOfToday(payload),
      };

    case ACTION_ADD_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        error: null,
      };

    case ACTION_DELETE_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        error: null,
      };

    case ACTION_EDIT_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        error: null,
      };

    case ACTION_ACTION_ERROR:
      return {
        ...state,
        loadingAction: false,
        error: payload,
      };

    default:
      return state;
  }
};

const getCompletedActionsOfToday = (actions) => {
  if (!actions || !Array.isArray(actions)) return 0;

  return actions.filter((action) => {
    const status = action?.completed?.status;
    const completionDate = action?.completed?.completionDate;

    if (!status || !completionDate) return false;

    const d = parseISO(completionDate);
    const now = new Date();

    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    );
  }).length;
};
