import {
  LOGIN_USER,
  JOIN_USER,
  AUTH_USER,
  CHECK_USER,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case JOIN_USER:
      return { ...state, joinSuccess: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case CHECK_USER:
      return { ...state, checkSuccess: action.payload };
    default:
      return state;
  }
}
