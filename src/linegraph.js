import React from "react";
import Chart from "chart.js";
import "./linechart.css";
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;

const chartRef = React.createRef();
export default class Linegraph extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.active !== this.props.active ||
      prevProps.confirmed !== this.props.confirmed ||
      prevProps.deaths !== this.props.deaths ||
      prevProps.recovered !== this.props.recovered
    ) {
      this.createGraph();
    } else return false;
  }
  componentDidMount() {
    this.createGraph();
  }

  createGraph = () => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "ACTIVE",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            data: this.props.active,
          },
          {
            label: "CONFIRMED",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            data: this.props.confirmed,
          },
          {
            label: "DEATHS",
            backgroundColor: "rgba(0, 0, 255, 1)",
            data: this.props.deaths,
          },
          {
            label: "RECOVERED",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            data: this.props.recovered,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true, // this should be set to make the bars stacked
            },
          ],
          yAxes: [
            {
              stacked: true, // this should be set to make the bars stacked
            },
          ],
        },
      },
    });
  };
  
  render() {
    return (
      <div className="">
        <canvas id="myChart" ref={chartRef} />
      </div>
    );
  }
}
