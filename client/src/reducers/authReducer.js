import { REGISTER_SUCCESS } from "../actions/actionsTypes";

const initialState = { authenticated: false, firstName: "" };
if (localStorage.getItem("token")) initialState.authenticated = true;

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.data.token);
      localStorage.setItem("firstName", payload.data.firstName);
      return (state = {
        authenticated: true,
        firstName: payload.data.firstName,
      });
    default:
      return state;
  }
};
