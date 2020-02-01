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

class index extends Component {
  componentDidMount = () => {
    if (!this.props.text) this.props.fetchARandomText();
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
    if (!this.props.text) this.props.fetchARandomText();
  };
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Typewriter
          style={{ width: 150, height: 150, marginTop: 90, marginLeft: 10 }}
        />

        {this.props.text ? (
          <TextBlock text={this.props.text} history={this.props.history} />
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
    fetchARandomText: () => dispatch(fetchARandomText()),
    resetText: () => dispatch(resetText()),
    resetLastScore: () => dispatch(resetlastScore())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
