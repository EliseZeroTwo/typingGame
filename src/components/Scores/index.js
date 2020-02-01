import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../NavBar";
import Leaderboard from "./Leaderboard";
import { fetchLeaderboard } from "../../redux/actions";
import { Button, Spin } from "antd";

class index extends Component {
  componentDidMount = () => {
    this.props.fetchLeaderboard();
  };
  componentDidUpdate = prevProps => {
    if (this.props.lastScore != prevProps.lastScore) {
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
          <div className="mb-3">
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
          </div>
        )}
        {this.props.loading && (
          <Spin size="large" style={{ display: "block", marginBottom: 15 }} />
        )}
        <Button
          onClick={() => this.props.history.replace("/game")}
          className="mt-2"
        >
          Start a test
        </Button>
        {this.props.leaderboard ? (
          <Leaderboard scores={this.props.leaderboard} />
        ) : (
          <Spin size="large" style={{ display: "block", marginTop: 100 }} />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastScore: state.game.lastScore,
    leaderboard: state.game.leaderboard,
    loading: state.game.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    fetchLeaderboard: () => dispatch(fetchLeaderboard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
