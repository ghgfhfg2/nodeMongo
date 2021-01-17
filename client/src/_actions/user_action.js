import Axios from "axios";
import { LOGIN_USER, JOIN_USER, AUTH_USER, CHECK_USER } from "./types";
import { API_SERVER } from "../Config"

export function loginUser(dataToSubmit) {
  
  const request = Axios.post(`${API_SERVER}/api/users/login`, dataToSubmit,{ withCredentials: true }).then(
    (response) => response.data
  );  
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function joinUser(dataToSubmit) {
  const request = Axios.post(`${API_SERVER}/api/users/register`, dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: JOIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = Axios.get(`${API_SERVER}/api/users/auth`,{ withCredentials: true }).then(
    (response) => {
      return response.data
    }
  );
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function check(dataToSubmit) {
  const request = Axios.post(`${API_SERVER}/api/users/check`, dataToSubmit).then(
    (response) => response.data
  );
  return {
    type: CHECK_USER,
    payload: request,
  };
}
