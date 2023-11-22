import React, { Component } from "react";
import { Bar, Line } from "react-chartjs-2";
import "./Charts.scss";

class Charts extends Component {
  render() {
    return (
      <div className="charts-container">
        <Bar
          data={{
            labels: ["a", "b", "c", "d"],
            datasets: [
              {
                label: "label 1",
                data: [200, 300, 400]
              },
              {
                label: "label 2",
                data: [20, 30, 40]
              },
            ]
          }}
        />
      </div>
    );
  }
}

export default Charts;
