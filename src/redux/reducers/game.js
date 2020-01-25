import {
  CREATE_SCORE,
  FETCH_TEXT,
  FETCH_LEADERBOARD
} from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SCORE:
      return { ...state, lastScore: payload };
    case FETCH_TEXT:
      return { ...state, text: payload };
    case FETCH_LEADERBOARD:
      return { ...state, leaderboard: payload };
    default:
      return state;
  }
};
