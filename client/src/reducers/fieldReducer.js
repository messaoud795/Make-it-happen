import {
  FIELD_ACTION_ERROR,
  FIELD_ACTION_START,
  FIELD_ADD_SUCCESS,
  FIELD_DELETE_SUCCESS,
  FIELD_EDIT_SUCCESS,
  FIELD_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialstate = { name: null, loadingField: false, error: null };

export const fieldReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case FIELD_ACTION_START:
      return (state = { ...state, loadingField: true });
    case FIELD_LOAD_SUCCESS:
      return (state = { ...state, name: payload, loadingField: false });
    case FIELD_EDIT_SUCCESS:
      return (state = { ...state, loadingField: false });
    case FIELD_ADD_SUCCESS:
      return (state = { ...state, loadingField: false });
    case FIELD_DELETE_SUCCESS:
      return (state = { ...state, loadingField: false });
    case FIELD_ACTION_ERROR:
      return (state = { ...state, loadingField: false, error: payload.error });
    default:
      return state;
  }
};
