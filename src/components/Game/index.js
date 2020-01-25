import React, { Component } from "react";
import NavBar from "../NavBar";
import { ReactComponent as Typewriter } from "./assets/typewriter.svg";
import TextBlock from "./TextBlock";
import { connect } from "react-redux";

class index extends Component {
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <Typewriter
          style={{ width: 150, height: 150, marginTop: 90, marginLeft: 10 }}
        />
        {this.props.text && (
          <TextBlock text={this.props.text} history={this.props.history} />
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

export default connect(mapStateToProps)(index);
