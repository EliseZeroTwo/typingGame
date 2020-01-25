import { combineReducers } from "redux";
//import your reducer files here like the following two lines
import game from "./game";
import auth from "./auth";
const rootReducer = combineReducers({
  //the following two lines are an example
  game: game,
  auth: auth
});

export default rootReducer;
