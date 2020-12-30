import { LOGIN_USER } from "../_actions/types";
import { JOIN_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case JOIN_USER:
      return { ...state, joinSuccess: action.paload };
    default:
      return state;
  }
}
