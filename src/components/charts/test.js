import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import Thumbnails from "../charts/thumbnails";
import { Select } from "../charts/select";
import {
  MAX_COUNT,
  ITEMS_PER_SCREEN,
  DEFAULT_FORM_DATA,
  EMOTION_TYPE,
} from "../../utils/constants";

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [eleWidth, setEleWidth] = useState(null);

  const addData = (numData, chart) => {
    for (let i = 0; i < numData; i++) {
      chart.data.datasets[0].data.push(Math.random() * 100);
      chart.data.datasets[1].data.push(Math.random() * 100);
      chart.data.labels.push(i * 5 + 20);
      const newwidth =
        document.getElementById("emotionChartAreaWrapper").offsetWidth +
        document.getElementById("emotionChartWrapper").clientWidth /
          ITEMS_PER_SCREEN;
      document.getElementById(
        "emotionChartAreaWrapper"
      ).style.width = `${newwidth}px`;
    }
  };
  const generateLabel = () => {
    const label = [];
    for (let i = 0; i < ITEMS_PER_SCREEN; i++) {
      label[i] = i * 5;
    }
    return label;
  };
  const generateData = () => {
    const data = [];
    for (let i = 0; i < ITEMS_PER_SCREEN; i++) {
      data[i] = Math.random() * 100;
    }
    return data;
  };
  const chartData = {
    labels: generateLabel(),
    datasets: [
      {
        label: "Test Data Set1",
        data: generateData(),
        borderColor: "#9C4C8F",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#9C4C8F",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "#9C4C8F",
      },
      {
        label: "Test Data Set2",
        data: generateData(),
        borderColor: "#ed891d",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#ed891d",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "#ed891d",
      },
    ],
  };

  useEffect(() => {
    let rectangleSet = false;
    const canvasTest = document.getElementById("chart-Test");
    const chartTest = new Chart(canvasTest, {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: false,
        title: {
          display: false,
        },
        legend: {
          display: false,
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
                borderDash: [6, 4],
                color: "#A9B0C3",
                lineWidth: 2,
                zeroLineColor: "#A9B0C3",
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
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
                color: "#A9B0C3",
                lineWidth: 2,
                zeroLineColor: "#A9B0C3",
              },
              ticks: {
                callback: function (value, index, values) {
                  return value !== 0 ? value + "''" : 0;
                },
              },
            },
          ],
        },
        animation: {
          onComplete: function () {
            setEleWidth(
              document.getElementById("emotionChartWrapper").clientWidth /
                ITEMS_PER_SCREEN
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
                .getElementById("axis-Test")
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
    addData(MAX_COUNT - ITEMS_PER_SCREEN, chartTest);

    document.getElementById("emotionThumbnailWrapper").onscroll = (event) => {
      document.getElementById(
        "emotionChartWrapper"
      ).scrollLeft = document.getElementById(
        "emotionThumbnailWrapper"
      ).scrollLeft;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <label className="charts-title">Emotion level over time</label>
      
      <div className="chartWrapper">
        <div className="chartAreaWrapper" id="emotionChartWrapper">
          <div className="chartAreaWrapper1" id="emotionChartAreaWrapper">
            <canvas id="chart-Test" height="400" width="1200"></canvas>
          </div>
        </div>
        <canvas id="axis-Test" width="0"></canvas>
      </div>
      <div className="thumbnailGroup" id="emotionThumbnailWrapper">
        <Thumbnails
          index={selectedImage}
          eleWidth={eleWidth}
          type={"emotion"}
        />
      </div>
    </React.Fragment>
  );
};
export default Test;
