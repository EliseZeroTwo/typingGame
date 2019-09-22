import React, { Component } from "react";
import Leaderboard from "./Leaderboard";
import Word from "./Word";
import texts from "./data";

class Game extends Component {
  state = {
    query: "",
    time: 0,
    isOn: false,
    start: 0,
    text: texts[this.getRandomInt(10)]
  };
  componentDidMount() {
    this.refs.textF.focus();
    this.originalNumerOfCharacters = this.state.text.split("").length;
    this.origNumberOfWords = this.state.text.split("").length / 5;
  }

  originalNumerOfCharacters = 0;
  origNumberOfWords = 0;
  wordCounter = 0;
  wordIndex = 0;
  wordArray = false;
  originText = this.state.text;

  counter = -1;
  startTimer() {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    });
    this.timer = setInterval(
      () =>
        this.setState({
          time: Date.now() - this.state.start
        }),
      1
    );
  }
  stopTimer() {
    this.setState({ isOn: false });
    clearInterval(this.timer);
  }
  getRandomInt(max) {
    let r = Math.floor(Math.random() * Math.floor(max));

    return r;
  }
  endGame = out => {
    this.stopTimer();
    let wpm = (this.origNumberOfWords / (this.state.time / 1000)) * 60;
    this.setState({ time: 0 });

    if (out) {
      this.refs.score.textContent = "Your speed is: 0 WPM";
      this.refs.accuracy.textContent = "Your accuracy is: 100%";
    } else {
      this.refs.score.textContent = `Your speed is: ${Math.ceil(wpm)} WPM`;
      this.refs.accuracy.textContent = `Your accuracy is: ${Math.floor(
        (this.originalNumerOfCharacters / (this.counter + 1)) * 100
      )}%`;
      this.props.end(
        Math.ceil(wpm),
        Math.floor((this.originalNumerOfCharacters / (this.counter + 1)) * 100)
      );
    }
    this.wordArray = false;
    this.refs.textF.style.display = "none";
    this.refs.h.style.display = "none";
    this.wordIndex = 0;
  };
  handleChange = event => {
    // if (event.target.value == "admin") {
    //   this.setState({
    //     query: "",
    //     text: ""
    //   });
    //   this.endGame(true);

    //   return;
    // }
    this.counter++;
    if (!this.wordArray) this.wordArray = this.state.text.split(" ");

    if (!this.state.isOn) this.startTimer();

    if (
      this.wordArray[0] + " " === event.target.value ||
      (this.wordArray[0] === event.target.value && this.wordArray.length == 1)
    ) {
      this.wordIndex++;
      this.setState({ query: "" });
      let newText = this.state.text.substring(this.wordArray[0].length + 1);
      this.wordArray.splice(0, 1);

      this.setState({ text: newText });
      if (this.wordArray.length === 0) {
        this.endGame(false);
      }
    } else {
      if (
        !this.wordArray[0].includes(event.target.value) ||
        event.target.value.split("")[0] !== this.wordArray[0].split("")[0]
      ) {
        this.refs.textF.style.backgroundColor = "#cb6a6a";
      } else {
        this.refs.textF.style.backgroundColor = "white";
      }
      this.setState({ query: event.target.value });
    }
  };
  fn = () => {
    if (this.state.text.length === 0) {
      return (
        <div>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              let newPara = texts[this.getRandomInt(10)];
              this.setState({ text: newPara, query: "" });
              this.originText = newPara;

              this.refs.score.textContent = "";
              this.refs.accuracy.textContent = "";
              this.originalNumerOfCharacters = newPara.split("").length;
              this.origNumberOfWords = newPara.split("").length / 5;
              this.counter = -1;
              this.refs.textF.style.display = "block";
              this.refs.h.style.display = "block";
              this.refs.textF.style.backgroundColor = "white";
              this.refs.textF.focus();
            }}
          >
            Try again
          </button>
          <Leaderboard />
        </div>
      );
    }
  };

  showWords = () => {
    let index = 0;

    let list = this.originText.split(" ").map(word => {
      if (word == this.state.text.split(" ")[0] && index == this.wordIndex) {
        index++;
        return (
          <div style={{ display: "inline" }}>
            <Word word={word} color="red" />
            <span> </span>
          </div>
        );
      } else {
        index++;
        return (
          <div style={{ display: "inline", height: "50%" }}>
            <Word word={word} />
            <span> </span>
          </div>
        );
      }
    });

    return list;
  };
  render() {
    return (
      <div className="container my-5">
        <h3
          ref="h"
          className="my-5"
          style={{
            fontFamily: "'Titillium Web', sans-serif",
            lineHeight: "1.4"
          }}
        >
          {this.showWords()}
        </h3>

        <input
          className="form-control rounded-pill"
          type="text"
          ref="textF"
          value={this.state.query}
          onChange={this.handleChange}
          style={{ fontSize: "30px" }}
        />
        <h2 ref="score" className="mt-5"></h2>
        <h2 ref="accuracy" className="mb-5"></h2>
        {this.fn()}
      </div>
    );
  }
}

export default Game;
