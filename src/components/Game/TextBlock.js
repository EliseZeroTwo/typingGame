import React, { Component } from "react";
import Word from "./Word";
import { Input } from "antd";
import {
  createScore,
  createUScore,
  fetchARandomText,
  resetText,
  setLoadingOn
} from "../../redux/actions";
import { connect } from "react-redux";
import { createRandomScore } from "../../redux/actions/game";

class TextBlock extends Component {
  constructor(props) {
    super(props);
    this.wordRef = React.createRef();
  }
  state = {
    nextWord: "",
    currentIndex: 0,
    error: false,
    inputValue: "",
    isTimerOn: false,
    time: 0,
    incorrectKeystrokes: 0,
    wpm: 0,
    typedKeys: 0,
    longestTyped: "",
    topValue: 0
  };
  componentDidMount = () => {
    this.refs.textInput.focus();
    this.setState({
      nextWord: this.props.text.text.split(" ")[0].concat(" ")
    });
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

    this.setState({
      inputValue: e.target.value,
      wpm: Math.floor((this.state.typedKeys / 5 / this.state.time) * 60)
    });

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
      if (
        this.state.longestTyped == "" ||
        e.target.value.length > this.state.longestTyped.length
      ) {
        this.setState({
          longestTyped: e.target.value,
          typedKeys: this.state.typedKeys + 1
        });
      }

      if (this.state.nextWord.length == e.target.value.length) {
        this.setState({ currentIndex: this.state.currentIndex + 1 });
        this.setState({ inputValue: "", longestTyped: "" });
        if (
          this.refs["w".concat(this.state.currentIndex)].refs.word.offsetWidth +
            this.refs["w".concat(this.state.currentIndex)].refs.word
              .offsetLeft >=
          this.refs.textArea.clientWidth
        )
          this.setState({
            topValue:
              this.state.topValue -
              this.refs["w".concat(this.state.currentIndex)].refs.word
                .offsetHeight -
              2
          });
        if (
          this.state.currentIndex + 2 ==
          this.props.text.text.split(" ").length
        ) {
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
            let type = localStorage.getItem("type");
            if (!type) type = 0;
            if (this.props.text.id) {
              if (this.props.user) {
                this.props.createScore({
                  wpm: Math.ceil(wpm),
                  accuracy: accuracy,
                  text: textID
                });
              } else {
                this.props.createUScore({
                  wpm: Math.ceil(wpm),
                  accuracy: accuracy,
                  text: textID
                });
              }
            } else {
              this.props.createRandomScore(
                {
                  wpm: Math.ceil(wpm),
                  accuracy: accuracy,
                  type: type
                },
                !!this.props.user ? false : true
              );
            }

            this.props.fetchARandomText(type);
            // this.props.resetText();
            this.props.setLoadingOn();

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
        ref={"w".concat(indx)}
        lastWord={indx != length - 1 ? false : true}
        error={this.state.error && indx == this.state.currentIndex}
        isCurrent={indx == this.state.currentIndex}
      />
    ));
    return (
      <div className="mx-auto mt-4" style={{ width: "85%", height: "auto" }}>
        <div
          className="mx-auto"
          style={{
            paddingTop: 6,

            paddingRight: 5,
            paddingLeft: 5,
            height: 122,
            width: "85%",
            overflow: "hidden",
            borderStyle: "dotted",
            borderWidth: 1
          }}
        >
          <h5
            className=" mx-auto"
            ref={"textArea"}
            style={{
              lineHeight: 1.7,
              width: "100%",
              fontSize: 22,
              wordSpacing: "-5px",
              textAlign: "justify",
              textJustify: "inter-word",
              userSelect: "none",
              position: "relative",
              top: `calc(${this.state.topValue}px - 0.19rem)`
            }}
          >
            {wordsRender}
          </h5>
        </div>
        <Input
          className="mt-4 w-50 py-4"
          ref={"textInput"}
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="off"
          style={{
            backgroundColor: this.state.error && "#ed2846",
            fontSize: 28
          }}
          value={this.state.inputValue}
          placeholder={!this.state.time ? "Start typing here.." : ""}
          onChange={this.handleChange}
        />
        <p style={{ display: "inline", marginLeft: 16, fontSize: "1.6rem" }}>
          {this.state.wpm} WPM
        </p>
        {!this.state.isTimerOn && (
          <p className="mt-2 text-muted">
            The timer will start as soon as you start typing
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth,
    text: state.game.text
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    fetchARandomText: type => dispatch(fetchARandomText(type)),
    createScore: score => dispatch(createScore(score)),
    setLoadingOn: () => dispatch(setLoadingOn()),
    createUScore: score => dispatch(createUScore(score)),
    createRandomScore: (score, local) =>
      dispatch(createRandomScore(score, local))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextBlock);
