import React, { Component } from "react";

export default class Word extends Component {
  render() {
    const getColor = () => {
      if (this.props.error) return "#ed2846";
      else if (this.props.isCurrent) return "#9bbde1";
    };
    return (
      <>
        <span
          ref="word"
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 2,
            paddingLeft: 2,
            backgroundColor: getColor(),
            borderRadius: 6
          }}
        >
          {this.props.word}
        </span>
        <span>{this.props.lastWord ? "" : " "}</span>
      </>
    );
  }
}
