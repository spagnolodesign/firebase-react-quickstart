import { LOG_IN_SUCCESS, LOG_OUT_USER, AUTH_ERROR } from "../constants/action-types";

const initialSessionState = {
  authenticated: !!sessionStorage.auth,
  error: "",
  authData: ""
}

export function session(state = initialSessionState, action) {
    switch (action.type) {
      case LOG_IN_SUCCESS:
        sessionStorage.setItem('auth', true);
        return {
          authenticated: true,
          authData: action.authdata
        }
      case LOG_OUT_USER:
        sessionStorage.removeItem("auth");
        return {
          authenticated: false,
          authData: ""
        }
      case AUTH_ERROR:
        return {
          authenticated: false,
          error: action.error
        }
      default:
        return state;
  }
}
