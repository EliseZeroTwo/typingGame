import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class WelcomePage extends Component {
  displayError = () => {
    if (this.props.user.serror) {
      return (
        <ul className="w-50 mx-auto">
          {Object.entries(this.props.user.serror).map(el => (
            <li style={{ color: "red" }}>{el[1]}</li>
          ))}
        </ul>
      );
    } else if (this.props.user.error) return this.props.user.error;
  };
  render() {
    if (this.props.user && !this.props.user.error && !this.props.user.serror) {
      return <Redirect to="/game" />;
    }
    return (
      <div>
        <h1 className="my-5" style={{ fontSize: "80px" }}>
          Touch Typo
        </h1>
        {this.props.user && (
          <h6 className="mb-3" style={{ color: "red" }}>
            {this.displayError()}
          </h6>
        )}
        <div className="w-50 mx-auto">
          <LoginForm history={this.props.history} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(mapStateToProps)(WelcomePage);
