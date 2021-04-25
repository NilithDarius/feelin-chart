import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js";
import Thumbnails from "./thumbnails";
import reactDom from "react-dom";
function AttentionChart() {
  const [eleWidth, setEleWidth] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const addData = (numData, chart) => {
    for (var i = 0; i < 10; i++) {
      let rand1 = Math.random() * 100;
      let rand2 = Math.random() * 100;
      chart.data.datasets[0].data.push([rand1, rand1 + 2]);
      chart.data.datasets[1].data.push([rand2, rand2 + 2]);
      chart.data.labels.push(i * 5 + 20);
      var newwidth =
        document.getElementById("attentionChartAreaWrapper").offsetWidth +
        document.getElementById("emotionChartWrapper").clientWidth / 10;
      document.getElementById(
        "attentionChartAreaWrapper"
      ).style.width = `${newwidth}px`;
    }
  };
  const generateLabel = () => {
    var label = [];
    for (var i = 0; i < 10; i++) {
      label[i] = i * 5;
    }
    return label;
  };
  const chartData = {
    labels: generateLabel(),
    datasets: [
      {
        label: "VALUE 1",
        data: [
          [10, 12],
          [77, 79],
          [50, 52],
          [24, 26],
          [59, 61],
          [80, 82],
          [45, 47],
          [31, 33],
          [26, 28],
          [8, 10],
        ],
        backgroundColor: "#9C4C8F",
        categoryPercentage: 1,
        pointRadius: 7,
      },
      {
        label: "VALUE 2",
        data: [
          [30, 32],
          [23, 25],
          [78, 80],
          [90, 92],
          [20, 22],
          [14, 16],
          [86, 88],
          [36, 38],
          [64, 66],
          [22, 24],
        ],
        backgroundColor: "#ed891d",
        categoryPercentage: 1,
        pointRadius: 7,
      },
    ],
  };

  useEffect(() => {
    var rectangleSet = false;
    var canvasTest = document.getElementById("attention-Chart");
    var chartTest = new Chart(canvasTest, {
      type: "bar",
      data: chartData,
      maintainAspectRatio: false,
      responsive: true,
      options: {
        maintainAspectRatio: false,
        title: {
          display: false,
          text: "Chart Title",
        },
        tooltips: {
          titleFontSize: 15,
          titleMarginBottom: 10,
          bodyFontSize: 10,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
                zeroLineColor: "#A9B0C3",
                color: "#A9B0C3",
                borderDash: [6, 4],
                borderColor: "#A9B0C3",
              },
              ticks: {
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
              stacked: false,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: true,
                color: "#A9B0C3",
                lineWidth: 2,
              },
              ticks: {
                callback: function (value, index, values) {
                  return value !== 0 ? value + "''" : value;
                },
              },
              stacked: true,
            },
          ],
        },
        animation: {
          onComplete: function () {
            setEleWidth(
              document.getElementById("attentionChartWrapper").offsetWidth / 10
            );
            if (!rectangleSet) {
              var scale = window.devicePixelRatio;

              var sourceCanvas = chartTest.chart.canvas;
              var copyWidth = chartTest.scales["y-axis-0"].width + 5;
              var copyHeight =
                chartTest.scales["y-axis-0"].height +
                chartTest.scales["y-axis-0"].top +
                10;

              var targetCtx = document
                .getElementById("axis-Chart")
                .getContext("2d");

              targetCtx.scale(scale, scale);
              targetCtx.canvas.width = copyWidth * scale;
              targetCtx.canvas.height = copyHeight * scale;

              targetCtx.canvas.style.width = `${copyWidth}px`;
              targetCtx.canvas.style.height = `${copyHeight}px`;
              targetCtx.drawImage(
                sourceCanvas,
                0,
                0,
                copyWidth * scale,
                copyHeight * scale,
                0,
                0,
                copyWidth * scale,
                copyHeight * scale
              );

              var sourceCtx = sourceCanvas.getContext("2d");

              // Normalize coordinate system to use css pixels.

              sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
              rectangleSet = true;
            }
          },
          onProgress: function () {
            if (rectangleSet === true) {
              var copyWidth = chartTest.scales["y-axis-0"].width;
              var copyHeight =
                chartTest.scales["y-axis-0"].height +
                chartTest.scales["y-axis-0"].top +
                10;

              var sourceCtx = chartTest.chart.canvas.getContext("2d");
              sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
            }
          },
        },
        onHover: function (evt, element, index) {
          evt.target.style.cursor = element[0] ? "pointer" : "default";
          setSelectedImage(element[0] ? element[0]._index : "");
        },
      },
    });
    addData(10, chartTest);

    document.getElementById("attentionThumbnailWrapper").onscroll = (event) => {
      document.getElementById(
        "attentionChartWrapper"
      ).scrollLeft = document.getElementById(
        "attentionThumbnailWrapper"
      ).scrollLeft;
    };
  }, []);
  return (
    <React.Fragment>
      <label className="charts-title">Attention level on time</label>
      <div className="chartWrapper">
        <div className="chartAreaWrapper" id="attentionChartWrapper">
          <div className="chartAreaWrapper2" id="attentionChartAreaWrapper">
            <canvas id="attention-Chart" height="400" width="1200"></canvas>
          </div>
        </div>
        <canvas id="axis-Chart" height="400" width="0"></canvas>
      </div>
      <div style={{ overflow: "scroll" }} id="attentionThumbnailWrapper">
        <Thumbnails
          index={selectedImage}
          eleWidth={eleWidth}
          type="attention"
        />
      </div>
    </React.Fragment>
  );
}
export default AttentionChart;
