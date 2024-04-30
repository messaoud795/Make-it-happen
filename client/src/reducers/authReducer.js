import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  PROFILE_LOAD_SUCCESS,
  REGISTER_SUCCESS,
} from "../actions/actionsTypes";

const initialState = { authenticated: false, profile: null };
if (localStorage.getItem("token")) initialState.authenticated = true;

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.data.token);

      return (state = {
        authenticated: true,
        profile: payload.data.userData,
      });
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.data.token);
      return (state = {
        authenticated: true,
        profile: payload.data.userData,
      });
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return (state = {
        authenticated: false,
        profile: null,
      });
    case PROFILE_LOAD_SUCCESS:
      return (state = {
        ...state,
        profile: payload,
      });

    default:
      return state;
  }
};
