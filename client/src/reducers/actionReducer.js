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
      const updatedActions = state.todayActions.map((action) => {
        if (action._id === payload._id) return payload;
        else return action;
      });
      return {
        ...state,
        todayActions: updatedActions,
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
