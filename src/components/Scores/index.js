import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../NavBar";
import Leaderboard from "./Leaderboard";
import { fetchLeaderboard } from "../../redux/actions";
import { Button } from "antd";

class index extends Component {
  componentDidMount = () => {
    this.props.fetchLeaderboard();
  };
  componentDidUpdate = prevProps => {
    console.log(prevProps);
    if (this.props.lastScore != prevProps.lastScore) {
      console.log("here");
      this.props.fetchLeaderboard();
    }
  };
  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <h1
          className="my-5"
          style={{ fontSize: "80px", cursor: "pointer" }}
          onClick={() => this.props.history.replace("/game")}
        >
          Touch Typo
        </h1>
        {this.props.lastScore && (
          <>
            <h2 style={{ marginTop: 50 }}>Here's your result:</h2>
            <h4 className="mt-3">Your speed is: {this.props.lastScore.wpm}</h4>
            <h4>
              Your accuracy is:{" "}
              {parseFloat((this.props.lastScore.accuracy * 100).toFixed(1))}%
            </h4>
            {this.props.lastScore.local && (
              <p className="text-muted">
                Your score was not saved because you're not signed in.
              </p>
            )}
          </>
        )}
        {this.props.leaderboard && (
          <Leaderboard scores={this.props.leaderboard} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastScore: state.game.lastScore,
    leaderboard: state.game.leaderboard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    fetchLeaderboard: () => dispatch(fetchLeaderboard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
