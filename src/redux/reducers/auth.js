import {
  SET_CURRENT_USER,
  SET_ERROR,
  SET_ERROR_SIGNUP
} from "../actions/actionTypes";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload;
    case SET_ERROR:
      return { ...state, error: action.payload.detail };
    case SET_ERROR_SIGNUP:
      return { ...state, serror: action.payload };
    case "CLEAR_LOGIN_ERROR":
      return null;
    case "CLEAR_SIGNUP_ERROR":
      return null;
    default:
      return state;
  }
};
