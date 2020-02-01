import {
  CREATE_SCORE,
  FETCH_TEXT,
  FETCH_LEADERBOARD,
  RESET_TEXT,
  RESET_LAST,
  SET_LOADING
} from "../actions/actionTypes";

const initialState = { loading: false };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SCORE:
      return { ...state, lastScore: payload, loading: false };
    case FETCH_TEXT:
      return { ...state, text: payload };
    case FETCH_LEADERBOARD:
      return { ...state, leaderboard: payload };
    case RESET_TEXT:
      return { ...state, text: null };
    case RESET_LAST:
      return { ...state, lastScore: null };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
