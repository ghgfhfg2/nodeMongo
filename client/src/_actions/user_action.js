import Axios from "axios";
import { LOGIN_USER } from "./types";
import { JOIN_USER } from "./types";

export function loginUser(dataToSubmit) {
  const request = Axios.post("/api/users/login", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function joinUser(dataToSubmit) {
  const request = Axios.post("/api/users/register", dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: JOIN_USER,
    payload: request,
  };
}
