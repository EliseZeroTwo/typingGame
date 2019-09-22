import React, { Component } from "react";

class Leaderboard extends Component {
  fn = () => {
    let orderedList = localStorage.leaderboard.split(";").sort(function(a, b) {
      a = a.split(" ")[1];
      b = b.split(" ")[1];
      return b - a;
    });

    let list = [...new Set(orderedList)].slice(0, 10).map(item => {
      let name = item.split(" ")[0];
      if (name.includes("-")) {
        name = name.split("-").join(" ");
      }
      let score = item.split(" ")[1];
      let accuracy = item.split(" ")[2];

      if (name.length > 0)
        return (
          <tr key={[...new Set(orderedList)].indexOf(item) + 1}>
            <th scope="row">{[...new Set(orderedList)].indexOf(item) + 1}</th>
            <td>{name}</td>
            <td>{score}</td>
            <td>{accuracy}%</td>
          </tr>
        );
    });

    return list;
  };
  render() {
    return (
      <div className="container">
        <h1 className="mt-5">Leaderboard</h1>
        <table className="table my-5" style={{ fontSize: "25px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Score (WPM)</th>
              <th scope="col">Accuracy</th>
            </tr>
          </thead>
          <tbody>{this.fn()}</tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
