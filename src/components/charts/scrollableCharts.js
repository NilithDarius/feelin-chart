import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import Thumbnails from "./thumbnails";
import { ITEMS_PER_SCREEN, MAX_COUNT } from "../../utils/constants";

const ScrollableChart = ({ type, kind, resources, colorList }) => {
  const [eleWidth, setEleWidth] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const addData = (numData, chart) => {
    for (let i = 0; i < numData; i++) {
      if (type === "bar") {
        for (let j = 0; j < Object.keys(resources).length; j++) {
          chart.data.datasets[j].data.push([
            resources[Object.keys(resources)[j]][i + ITEMS_PER_SCREEN],
            resources[Object.keys(resources)[j]][i + ITEMS_PER_SCREEN] + 2,
          ]);
        }
      } else {
        for (let j = 0; j < Object.keys(resources).length; j++) {
          chart.data.datasets[j].data.push(
            resources[Object.keys(resources)[j]][i + ITEMS_PER_SCREEN]
          );
        }
      }

      chart.data.labels.push(i * 5 + 20);
      const newwidth =
        document.getElementById(`${kind}ChartAreaWrapper`).offsetWidth +
        document.getElementById(`${kind}ChartWrapper`).clientWidth /
          ITEMS_PER_SCREEN;
      document.getElementById(
        `${kind}ChartAreaWrapper`
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

  const generateData = (count) => {
    const data = {
      labels: [],
      datasets: [],
    };
    const indexArray = Object.keys(resources);
    data.labels = generateLabel();
    if (type === "bar") {
      for (let i = 0; i < count; i++) {
        let storeIndividualData = [];
        for (let j = 0; j < ITEMS_PER_SCREEN; j++) {
          storeIndividualData[j] = [
            resources[indexArray[i]][j],
            resources[indexArray[i]][j] + 2,
          ];
        }
        data.datasets.push({
          label: indexArray[i],
          data: storeIndividualData,
          backgroundColor: colorList[i],
          categoryPercentage: 1,
          pointRadius: 7,
        });
      }
    } else {
      for (let i = 0; i < count; i++) {
        data.datasets.push({
          label: indexArray[i],
          data: resources[indexArray[i]].slice(0, ITEMS_PER_SCREEN),
          backgroundColor: colorList[i],
          categoryPercentage: 1,
          borderColor: colorList[i],
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: colorList[i],
          pointRadius: 7,
          pointHoverRadius: 7,
        });
      }
    }

    return data;
  };

  useEffect(() => {
    let rectangleSet = false;
    const canvasTest = document.getElementById(`${kind}-Chart`);
    const chartTest = new Chart(canvasTest, {
      type: type,
      data: generateData(Object.keys(resources).length),
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
                zeroLineColor: "#A9B0C3",
                color: "#A9B0C3",
                borderDash: [6, 4],
                borderColor: "#A9B0C3",
                lineWidth: 2,
              },
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100,
                major: {
                  enabled: false,
                },
                stepSize: 20,
                callback: function (value) {
                  return value !== 0 ? value + "%" : "";
                },
              },
              stacked: false,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: type === "bar" ? true : false,
                color: "#A9B0C3",
                lineWidth: 2,
              },
              ticks: {
                callback: function (value) {
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
              document.getElementById(`${kind}ChartWrapper`).offsetWidth /
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
                .getElementById(`${kind}-Chart`)
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

    document.getElementById(`${kind}ThumbnailWrapper`).onscroll = (event) => {
      document.getElementById(
        `${kind}ChartWrapper`
      ).scrollLeft = document.getElementById(
        `${kind}ThumbnailWrapper`
      ).scrollLeft;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <div className="chartWrapper">
        <div className="chartAreaWrapper" id={`${kind}ChartWrapper`}>
          <div className="chartAreaWrapper2" id={`${kind}ChartAreaWrapper`}>
            <canvas id={`${kind}-Chart`} height="400" width="1200"></canvas>
          </div>
        </div>
        <canvas id={`${kind}-Chart`} height="400" width="0"></canvas>
      </div>
      <div className="thumbnailGroup" id={`${kind}ThumbnailWrapper`}>
        <Thumbnails index={selectedImage} eleWidth={eleWidth} type={kind} />
      </div>
    </React.Fragment>
  );
};
export default ScrollableChart;
