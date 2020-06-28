import React, { useEffect } from "react";
import Chart from "chart.js";
import "./linechart.css";
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
Chart.defaults.global.legend.display = false;

export default function Linegraph(props) {
  const chartRef = React.createRef();

  useEffect(() => {
    console.log(props);
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "ACTIVE",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            data: props.active,
          },
          {
            label: "CONFIRMED",
            backgroundColor: "rgba(0, 255, 0, 0.5)",
            data: props.confirmed,
          },
          {
            label: "DEATHS",
            backgroundColor: "rgba(0, 0, 255, 1)",
            data: props.deaths,
          },
          {
            label: "RECOVERED",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            data: props.recovered,
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
  }, [props.active]);

  return (
    <div className="">
      <canvas id="myChart" ref={chartRef} />
    </div>
  );
}
