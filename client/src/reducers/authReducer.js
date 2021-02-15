import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from "../actions/actionsTypes";

const initialState = { authenticated: false };
if (localStorage.getItem("token")) initialState.authenticated = true;

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.data.token);
      return (state = {
        authenticated: true,
      });
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.data.token);
      return (state = {
        authenticated: true,
      });
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      window.location.reload();
      return (state = {
        authenticated: false,
      });
    default:
      return state;
  }
};
