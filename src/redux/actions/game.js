import instance from "./instance";
import {
  CREATE_SCORE,
  FETCH_TEXT,
  FETCH_LEADERBOARD,
  RESET_TEXT,
  RESET_LAST,
  SET_LOADING,
  CREATE_U_SCORE,
  CREATE_RANDOM_SCORE
} from "./actionTypes";
import axios from "axios";
export const createScore = score => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api.touchtypo.com/api/create_score/",
        score
      );
      const scoreRes = res.data;

      dispatch({ type: CREATE_SCORE, payload: scoreRes });
    } catch (err) {
      dispatch({ type: CREATE_SCORE, payload: { ...score, local: true } });
      //   console.error(err);
    }
  };
};

export const createUScore = score => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api.touchtypo.com/api/create_u_score/",
        score
      );
      const scoreRes = res.data;

      dispatch({ type: CREATE_U_SCORE, payload: { ...score, local: true } });
    } catch (err) {
      //   console.error(err);
      dispatch({ type: CREATE_U_SCORE, payload: { ...score, local: true } });
    }
  };
};
export const createRandomScore = (score, local) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://api.touchtypo.com/api/create_random_score/",
        score
      );
      const scoreRes = res.data;
      if (!local) dispatch({ type: CREATE_RANDOM_SCORE, payload: scoreRes });
      else
        dispatch({ type: CREATE_U_SCORE, payload: { ...score, local: true } });
    } catch (err) {
      //   console.error(err);
      dispatch({
        type: CREATE_RANDOM_SCORE,
        payload: { ...score, local: true }
      });
    }
  };
};

export const fetchARandomText = type => {
  let url;
  if (type == 0) url = "/api/get_text/";
  else if (type == 1) url = "api/get_random_100/";
  else if (type == 2) url = "api/get_random_200/";
  return async dispatch => {
    try {
      const res = await instance.get(url);
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

export const resetText = () => {
  return {
    type: RESET_TEXT
  };
};

export const resetlastScore = () => {
  return {
    type: RESET_LAST
  };
};

export const setLoadingOn = () => {
  return {
    type: SET_LOADING
  };
};
