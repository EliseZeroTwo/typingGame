import instance from "./instance";
import { CREATE_SCORE, FETCH_TEXT, FETCH_LEADERBOARD } from "./actionTypes";
import axios from "axios";
export const createScore = score => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "http://94a77985.ngrok.io/api/create_score/",
        score
      );
      const scoreRes = res.data;
      console.log(scoreRes);
      dispatch({ type: CREATE_SCORE, payload: scoreRes });
    } catch (err) {
      dispatch({ type: CREATE_SCORE, payload: { ...score, local: true } });
      console.error(err);
    }
  };
};

export const fetchARandomText = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/api/get_text/");
      const text = res.data;
      dispatch({ type: FETCH_TEXT, payload: text });
    } catch (err) {
      console.error(err);
    }
  };
};

export const fetchLeaderboard = () => {
  return async dispatch => {
    try {
      const res = await instance.get("/api/get_scores/");
      const leaderboard = res.data;
      dispatch({ type: FETCH_LEADERBOARD, payload: leaderboard });
    } catch (err) {
      console.error(err);
    }
  };
};
