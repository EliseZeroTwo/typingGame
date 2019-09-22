import React, { Component } from "react";
import Typed from "typed.js";
class Name extends Component {
  componentDidMount() {
    const options = {
      strings: ["Enter your name..."],
      typeSpeed: 50,
      backSpeed: 50
    };

    this.typed = new Typed(this.el, options);
  }
  _handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.setName(e.target.value);
    }
  };
  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="container">
        <h1 className="my-5">
          <span
            ref={el => {
              this.el = el;
            }}
          ></span>
        </h1>

        <input
          className="form-control mb-5 mx-auto"
          ref="name"
          type="text"
          style={{ width: "250px" }}
          onKeyDown={this._handleKeyDown}
        />
        <button
          className="btn btn-primary btn-lg"
          onClick={() => this.props.setName(this.refs.name.value)}
        >
          Start typing!
        </button>
      </div>
    );
  }
}

export default Name;
