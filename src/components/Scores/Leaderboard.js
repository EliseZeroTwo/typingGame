import React, { Component } from "react";

export default class Leaderboard extends Component {
  render() {
    const scores = this.props.scores.map((score, indx) => (
      <tr>
        <th scope="row">{indx + 1}</th>
        <td>{score.owner}</td>
        <td>{score.wpm}</td>
        <td>{parseFloat((score.accuracy * 100).toFixed(1))}%</td>
      </tr>
    ));
    return (
      <div className="container">
        <h3 className="mt-5">Leaderboard</h3>
        <table className="table my-3" style={{ fontSize: "20px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score (WPM)</th>
              <th scope="col">Accuracy</th>
            </tr>
          </thead>
          {scores}
        </table>
      </div>
    );
  }
}
