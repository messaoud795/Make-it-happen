import axios from "axios";
import {
  FIELD_LOAD_START,
  FIELD_LOAD_ERROR,
  FIELD_LOAD_SUCCESS,
} from "./actionsTypes";

import { configHeaders } from "./config";

export const loadFields = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_LOAD_START });
      const { data } = await axios.get("/api/field", configHeaders());
      dispatch({ type: FIELD_LOAD_SUCCESS, payload: data });
      console.log({ data });
    } catch (error) {
      dispatch({ type: FIELD_LOAD_ERROR, payload: error });
    }
  };
};
