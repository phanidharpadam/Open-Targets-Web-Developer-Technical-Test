import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function getGraphData(datatypeLabels, scoresData) {
  return {
    labels: datatypeLabels,
    datasets: [
      {
        data: scoresData,
        backgroundColor: "rgba(255, 255, 255, .2)",
        borderColor: "rgb(52, 137, 202)",
        pointBackgroundColor: "rgb(52,137,202)",
      },
    ],
  };
}

function getoptions(title) {
  return {
    responsive: true,
    beginAtZero: true,
    scales: {
      r: {
        grid: {
          circular: true,
          borderColor: "rgb(255, 255, 255)",
          lineWidth: 2,
        },
        angleLines: {
          borderColor: "rgb(255, 255, 255)",
          lineWidth: 2,
        },
        min: -0.1,
        max: 1,
        ticks: {
          stepSize: 0.25,
          callback: function (tick) {
            return tick.toFixed(3);
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        color: "rgb(121, 121, 121)",
        text: `Data Type Score:${title} and lung carcinoma`,
        align: "start",
        font: {
          weight: "normal",
        },
      },
    },
  };
}
function datatypeStringFormat(str) {
  const arr = str.split("_");
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join(" ");
}
export default function RadarChart(props) {
  const { datatypeScores, title } = props;

  const datatypeLabels = [],
    scoresData = [];
  for (let datatypeScore of datatypeScores) {
    datatypeLabels.push(datatypeStringFormat(datatypeScore.id));
    scoresData.push(datatypeScore.score);
  }
  return (
    <Radar
      data={getGraphData(datatypeLabels, scoresData)}
      options={getoptions(title)}
    />
  );
}
