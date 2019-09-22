import React, { Component } from "react";

import "./App.css";
import Game from "./Game.js";
import Name from "./Name.js";
class App extends Component {
  state = {
    currentName: false
  };
  fn = () => {
    // localStorage.clear();
    if (this.state.currentName) {
      return <Game end={this.gameEnded} />;
    } else {
      return <Name setName={this.setName} />;
    }
  };

  setName = name => {
    let username = name.trim().length > 0 ? name : "Anonymous";
    this.setState({
      currentName: username
    });
  };
  gameEnded = (score, accuracy) => {
    let str = localStorage.getItem("leaderboard");
    if (str == null) {
      str = "";
    }

    str = str.concat(
      this.state.currentName
        .trim()
        .split(" ")
        .join("-") +
        " " +
        score +
        " " +
        accuracy +
        ";"
    );

    localStorage.setItem("leaderboard", str);
  };
  render() {
    return (
      <div className="App">
        <h1 className="my-5" style={{ fontSize: "80px" }}>
          The Typing Game
        </h1>
        {this.fn()}
      </div>
    );
  }
}

export default App;
