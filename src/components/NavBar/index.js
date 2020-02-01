import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";

class index extends Component {
  render() {
    if (this.props.user)
      return (
        <div style={{ position: "absolute", top: 20, right: 40 }}>
          {/* {<a className="mr-3">Profile </a>} */}
          <a
            className="mr-3"
            onClick={() => this.props.history.push("/results")}
          >
            Leaderboard
          </a>
          <a onClick={() => this.props.logout()}>Logout</a>
        </div>
      );
    else
      return (
        <div style={{ position: "absolute", top: 20, right: 40 }}>
          <a
            className="mr-3"
            onClick={() => this.props.history.push("/results")}
          >
            Leaderboard
          </a>
          <a onClick={() => this.props.history.push("/")}>Login/Signup </a>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
