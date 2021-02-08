import {
  FIELD_LOAD_ERROR,
  FIELD_LOAD_START,
  FIELD_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialstate = [{ name: [], loadingField: false, error: null }];

export const fieldReducer = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case FIELD_LOAD_START:
      return (state = { ...state, loadingField: true });
    case FIELD_LOAD_SUCCESS:
      return (state = { ...state, name: payload, loadingField: false });
    case FIELD_LOAD_ERROR:
      return (state = { ...state, loadingField: false, error: payload.error });
    default:
      return state;
  }
};
