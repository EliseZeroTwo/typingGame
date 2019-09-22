import React, { Component } from "react";

class Word extends Component {
  fn = () => {
    if (this.props.color == "red")
      return (
        <span
          className="border border-primary rounded"
          style={{ backgroundColor: "#9bbde1" }}
        >
          {this.props.word}
        </span>
      );
    else return <span>{this.props.word}</span>;
  };
  render() {
    return this.fn();
  }
}

export default Word;
