import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import WelcomePage from "./components/WelcomePage";
import Game from "./components/Game";
import Scores from "./components/Scores";
// import Game from "./Game.js";
// import Name from "./Name.js";
class App extends Component {
  // state = {
  //   currentName: false
  // };
  // fn = () => {
  //   // localStorage.clear();
  //   if (this.state.currentName) {
  //     return <Game end={this.gameEnded} />;
  //   } else {
  //     return <Name setName={this.setName} />;
  //   }
  // };

  // setName = name => {
  //   let username = name.trim().length > 0 ? name : "Anonymous";
  //   this.setState({
  //     currentName: username
  //   });
  // };
  // gameEnded = (score, accuracy) => {
  //   let str = localStorage.getItem("leaderboard");
  //   if (str == null) {
  //     str = "";
  //   }

  //   str = str.concat(
  //     this.state.currentName
  //       .trim()
  //       .split(" ")
  //       .join("-") +
  //       " " +
  //       score +
  //       " " +
  //       accuracy +
  //       ";"
  //   );

  //   localStorage.setItem("leaderboard", str);
  // };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/results" component={Scores} />
          <Route path="/" component={WelcomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;
