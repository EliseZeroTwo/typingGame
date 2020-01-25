import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER, SET_ERROR, SET_ERROR_SIGNUP } from "./actionTypes";
import instance from "./instance";
import axios from "axios";

export const login = userData => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        userData
      );

      const user = res.data;

      dispatch(setCurrentUser(user.access));
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err.response.data });
      console.error(err.response.data);
    }
  };
};

const setCurrentUser = token => {
  let user;
  if (token) {
    localStorage.setItem("token", token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    user = jwt_decode(token);
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    user = null;
  }

  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logout = () => setCurrentUser();

export const checkForExpiredToken = () => {
  // Check for token expiration
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;

    // Decode token and get user info
    user = jwt_decode(token);

    // Check token expiration
    if (user.exp >= currentTimeInSeconds) {
      // Set user
      return setCurrentUser(token);
    }
  }
  return logout();
};

export const signup = userData => {
  return async dispatch => {
    try {
      const res = await instance.post("/api/register/", userData);
      //If your backend logs the user in when signing up use the following code
      const user = res.data;
      console.log(user);
      dispatch(setCurrentUser(user.access));
      //If it doesn't log you in
      dispatch(login(userData));
    } catch (err) {
      dispatch({ type: SET_ERROR_SIGNUP, payload: err.response.data });
      console.error(err.response.data);
    }
  };
};
