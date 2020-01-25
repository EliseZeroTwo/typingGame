import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { fetchARandomText } from "./redux/actions";
import { checkForExpiredToken } from "./redux/actions";
import store from "./redux";
//After defining the store use the following code to call checkForExpiredToken
store.dispatch(checkForExpiredToken());
// import your redux/index.js here (the store)

store.dispatch(fetchARandomText());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
