import React, { Component } from "react";
import NavBar from "../NavBar";
import { ReactComponent as Typewriter } from "./assets/typewriter.svg";
import TextBlock from "./TextBlock";
import { connect } from "react-redux";
import { Spin } from "antd";
import {
  fetchARandomText,
  resetText,
  resetlastScore
} from "../../redux/actions";
import { Radio } from "antd";

class index extends Component {
  componentDidMount = () => {
    if (!this.props.text) {
      let type = localStorage.getItem("type");
      if (!type) type = 0;
      this.props.fetchARandomText(type);
    }
    this.props.resetLastScore();
    document.addEventListener("keydown", this.escFunction, false);
  };
  escFunction = event => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      this.props.resetText();
    }
  };
  componentDidUpdate = () => {
    let type = localStorage.getItem("type");
    if (!type) type = 0;
    if (!this.props.text) this.props.fetchARandomText(type);
  };
  handleTypeChange = e => {
    this.props.resetText();
    localStorage.setItem("type", e.target.value);
    // this.props.fetchARandomText(e.target.value);
    // this.setState({ type: e.target.value });
  };
  render() {
    let type = localStorage.getItem("type");
    if (!type) type = 0;
    return (
      <div>
        <NavBar history={this.props.history} />
        <Typewriter
          style={{
            width: 150,
            height: 150,
            marginTop: 90,
            marginBottom: 30,
            marginLeft: 10,
            display: "block"
          }}
          className="mx-auto"
        />
        <Radio.Group value={parseInt(type)} onChange={this.handleTypeChange}>
          <Radio.Button value={0}>Random Paragraphs</Radio.Button>
          <Radio.Button value={1}>100 Random Words</Radio.Button>
          <Radio.Button value={2}>200 Random Words</Radio.Button>
        </Radio.Group>
        {this.props.text ? (
          <TextBlock history={this.props.history} />
        ) : (
          <Spin size="large" style={{ display: "block", marginTop: 150 }} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.game.text
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    fetchARandomText: type => dispatch(fetchARandomText(type)),
    resetText: () => dispatch(resetText()),
    resetLastScore: () => dispatch(resetlastScore())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
