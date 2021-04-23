import React, { useEffect, useState } from "react";
import { Line, Bar, HorizontalBar } from "react-chartjs-2";
import Thumbnails from "./thumbnails";
function AttentionChart() {
  const [selectedImage, setSelectedImage] = useState('');
  const data = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "VALUE 1",
        data: [
          [10, 13],
          [77, 80],
          [50, 53],
          [24, 27],
          [59, 62],
        ],
        // stack: 1,
        backgroundColor: "#9C4C8F",
        categoryPercentage: 1,
        pointRadius: 7,
      },
      {
        label: "VALUE 2",
        data: [
          [30, 33],
          [23, 26],
          [78, 81],
          [90, 93],
          [20, 23],
        ],
        // stack: 1,
        backgroundColor: "#ED891D",
        categoryPercentage: 1,
        pointRadius: 7,
      },
    ],
  };
  const options = {
    indexAxis: "x",
    responsive: true,
    legend: {
      position: "top",
      align: "end",
      labels: {
        fontColor: "#323130",
        fontSize: 14,
        boxWidth: 20,
        boxheight: 20,
        usePointStyle: 7,
      },
    },
    title: {
      display: false,
    },
    onHover: function(evt, element, index) {
      evt.target.style.cursor = element[0] ? 'pointer' : 'default'
      setSelectedImage(element[0] ? element[0]._index : '')
    },
    scales: {
      yAxes: [
        {
          id: "y-axis-0",
          gridLines: {
            display: true,
            borderDash: [5, 4],
            color: "#A9B0C3",
            zeroLineColor: "#A9B0C3",
            lineWidth: 2,
          },
          stacked: false,
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100,
            major: {
              enabled: false,
            },
            stepSize: 20,
            callback: function (value, index, values) {
              return value !== 0 ? value + "%" : "";
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: true,
            color: "#A9B0C3",
            lineWidth: 2,
            zeroLineColor: "#A9B0C3",
          },
          stacked: true,
          ticks: {
            beginAtZero: true,
            min: 0,
            suggestedMin: 0,
            suggestedMax: 60,
            callback: function (value, index, values) {
              return value !== 0 ? value + "''" : 0;
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <label className="charts-title">Attention level on time</label>
      <div className="charts-emotion-wrapper">
        <Bar data={data} options={options} height={50} />
      </div>
      <Thumbnails index={selectedImage}/>
    </div>
  );
}
export default AttentionChart;
