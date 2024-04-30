import axios from "axios";
import {
  FIELD_ACTION_ERROR,
  FIELD_ACTION_START,
  FIELD_ADD_SUCCESS,
  FIELD_DELETE_SUCCESS,
  FIELD_EDIT_SUCCESS,
  FIELD_LOAD_SUCCESS,
} from "./actionsTypes";
import { toastr } from "react-redux-toastr";
import { configHeaders } from "./config";

export const loadFields = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_ACTION_START });
      const { data } = await axios.get("/api/field", configHeaders());
      dispatch({ type: FIELD_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FIELD_ACTION_ERROR, payload: error });
    }
  };
};

export const editField = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_ACTION_START });
      let res = await axios.patch("/api/field/edit", data, configHeaders());
      dispatch({ type: FIELD_EDIT_SUCCESS });
      if (res.data.msg === "success") {
        toastr.success("Success!", res.data.msg);
        dispatch(loadFields());
      } else toastr.error("error!", res.data.msg);
    } catch (error) {
      dispatch({ type: FIELD_ACTION_ERROR, payload: error });
      toastr.error("error!", "servor error");
    }
  };
};
export const addField = (input) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_ACTION_START });
      let { data } = await axios.post("/api/field/add", input, configHeaders());
      dispatch({ type: FIELD_ADD_SUCCESS });
      if (data.msg === "success") {
        toastr.success("Success!", "New Field has been created");
      } else toastr.error("error!", data.msg);

      dispatch(loadFields());
    } catch (error) {
      console.log(error);
      dispatch({ type: FIELD_ACTION_ERROR, payload: error });
      toastr.error("error!", "Servor error");
    }
  };
};

export const deleteField = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FIELD_ACTION_START });
      await axios.delete(`/api/field/delete/${data.id}`, configHeaders());
      dispatch({ type: FIELD_DELETE_SUCCESS });
      toastr.success("Success!", "Field has been deleted");
    } catch (error) {
      dispatch({ type: FIELD_ACTION_ERROR, payload: error });
      toastr.error("error!", "Field not deleted");
    }
  };
};
