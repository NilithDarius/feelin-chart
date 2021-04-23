import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import Thumbnails from "./thumbnails";
function EmotionChart({ result }) {
  const [selectedImage, setSelectedImage] = useState('');

  const calcData = (data) => {
    let sum = 0;
    return data.reduce((cur, val, index) => {
      sum += val;
      if (index % 20 === 0) {
        cur.push((sum / 10 / 20) * 100);
        sum = 0;
      }
      return cur;
    }, []);
  };

  const labelData = useMemo(() => {
    if (result) {
      var i = 0;
      var tempData = [];
      for (i = 0; i <= 215; i += 5) {
        tempData[i / 5] = i;
      }
      tempData[i / 5] = 216;
      return tempData;
    }
  }, [result]);

  const sadnessData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.sadness);
    }
    return [];
  }, [result]);

  const fearData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.fear);
    }
    return [];
  }, [result]);

  const happyData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.happiness);
    }
    return [];
  }, [result]);

  const surpriseData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.surprise);
    }
    return [];
  }, [result]);

  const angerData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.anger);
    }
    return [];
  }, [result]);

  const disgustData = useMemo(() => {
    if (result) {
      return calcData(result.analytics.emotion.details.data.all.all.disgust);
    }
    return [];
  }, [result]);

  const data = {
    labels: labelData,
    datasets: [
      {
        label: "Sadness",
        data: sadnessData,
        borderColor: "#ED891D ",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#ED891D",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "#ED891D",
      },
      {
        label: "Fear",
        data: fearData,
        borderColor: "#31ce43",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "#31ce43",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "#31ce43",
      },
      {
        label: "Happy",
        data: happyData,
        borderColor: "pink",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "pink",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "pink",
      },
      {
        label: "Surprise",
        data: surpriseData,
        borderColor: "green",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "green",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "green",
      },
      {
        label: "Anger",
        data: angerData,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "blue",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "blue",
      },
      {
        label: "Disgust",
        data: disgustData,
        borderColor: "red",
        borderWidth: 2,
        fill: false,
        pointBackgroundColor: "red",
        pointRadius: 7,
        pointHoverRadius: 7,
        backgroundColor: "red",
      }
    ]
  };

  const legend = {
    display: true,
    position: "top",
    align: "end",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
      boxWidth: 20,
      boxheight: 20,
      usePointStyle: true,
    },
  };

  const options = {
    title: {
      display: false,
      text: "Chart Title",
    },
    onHover: function(evt, element) {
      evt.target.style.cursor = element[0] ? 'pointer' : 'default'
      setSelectedImage(element[0] ? element[0]._index : '')
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            borderDash: [6, 4],
            color: '#A9B0C3',
            lineWidth:  2,
            zeroLineColor: '#A9B0C3'
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
            color: '#A9B0C3',
            lineWidth:  2,
            zeroLineColor: '#A9B0C3'
          },
          ticks: {
            callback: function (value, index, values) {
              return value !== 0 ? value + "''" : value;
            },
          },
        },
      ],
    },
  };
  return (
    <div>
      <label className="charts-title">Emotion level over time</label>
      <div className="charts-emotion-wrapper">
        {/* <div className="form-group">
          <div className="rounded-select-button">
            <select>
              <option>22~23</option>
              <option>22~23</option>
              <option>22~23</option>
            </select>
          </div>
          <div className="rounded-select-button">
            <select>
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="rounded-select-button">
            <select value={0}>
              {emotionType.map((emotion) => (
                <option value={emotion.value}>{emotion.title}</option>
              ))}
            </select>
          </div>
          <div className="title-status">
            <div className="amount">
              <span>154 personals displayed</span>
            </div>
            <div>
              <div className="append-circle">
                <span></span>
                FEAR{" "}
              </div>
            </div>
            <div>
              <div className="append-circle">
                <span></span>
                Sadness{" "}
              </div>
            </div>
            <div>
              <div className="append-circle">
                <span></span>
                Happiness{" "}
              </div>
            </div>
          </div>
        </div> */}
        <Line data={data} legend={legend} options={options} height={50} />
      </div>
      <Thumbnails index={selectedImage}/>
    </div>
  );
}
export default EmotionChart;
