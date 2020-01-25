import React, { Component } from "react";
import Word from "./Word";
import { Input } from "antd";
import { createScore } from "../../redux/actions";
import { connect } from "react-redux";

class TextBlock extends Component {
  state = {
    nextWord: "",
    currentIndex: 0,
    error: false,
    inputValue: "",
    isTimerOn: false,
    time: 0,
    incorrectKeystrokes: 0
  };
  componentDidMount = () => {
    this.refs.textInput.focus();
    this.setState({ nextWord: this.props.text.text.split(" ")[0].concat(" ") });
  };
  startTimer = () => {
    this.setState({ isTimerOn: true });
    this.timerID = setInterval(this.timer, 100);
  };
  timer = () => {
    this.setState({ time: this.state.time + 0.1 });
  };
  handleChange = e => {
    if (!this.state.isTimerOn) this.startTimer();

    this.setState({ inputValue: e.target.value });
    if (!this.state.nextWord.startsWith(e.target.value)) {
      this.setState({
        error: true
      });
      if (this.state.error == false) {
        this.setState({
          incorrectKeystrokes: this.state.incorrectKeystrokes + 1
        });
      }
    } else {
      if (this.state.error) this.setState({ error: false });
      if (this.state.nextWord.length == e.target.value.length) {
        this.setState({ currentIndex: this.state.currentIndex + 1 });
        this.setState({ inputValue: "" });

        if (this.state.currentIndex + 2 == this.props.text.length) {
          this.setState({
            nextWord: this.props.text.text.split(" ")[
              this.state.currentIndex + 1
            ]
          });
        } else {
          if (this.props.text.text.split(" ")[this.state.currentIndex + 1]) {
            this.setState({
              nextWord: this.props.text.text
                .split(" ")
                [this.state.currentIndex + 1].concat(" ")
            });
          } else {
            //End of test
            clearInterval(this.timerID);

            const wpm =
              (this.props.text.text.length / 5 / this.state.time) * 60;
            const accuracy =
              (this.props.text.text.length - this.state.incorrectKeystrokes) /
              this.props.text.text.length;
            const textID = this.props.text.id;
            this.props.createScore({
              wpm: Math.ceil(wpm),
              accuracy: accuracy,
              text: textID
            });
            this.props.history.push("/results");
          }
        }
      }
    }
  };
  render() {
    const { length, text } = this.props.text;
    const words = text.split(" ");
    const wordsRender = words.map((word, indx) => (
      <Word
        word={word}
        lastWord={indx != length - 1 ? false : true}
        error={this.state.error && indx == this.state.currentIndex}
        isCurrent={indx == this.state.currentIndex}
      />
    ));
    return (
      <div className="mx-auto mt-5" style={{ width: "80%", height: "auto" }}>
        <h5 className="w-75 mx-auto" style={{ lineHeight: 1.8 }}>
          {wordsRender}
        </h5>
        <Input
          className="mt-3 w-75 py-3"
          ref="textInput"
          style={{
            backgroundColor: this.state.error && "#ed2846",
            fontSize: 20
          }}
          value={this.state.inputValue}
          placeholder="Start typing here.."
          onChange={this.handleChange}
        />
        {!this.state.isTimerOn && (
          <p className="mt-2 text-muted">
            The timer will start as soon as you start typing
          </p>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    createScore: score => dispatch(createScore(score))
  };
};

export default connect(null, mapDispatchToProps)(TextBlock);