import React from 'react'
import { Line } from 'react-chartjs-2'
function AttentionChart() {
  const data = {
    labels: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,  
        borderColor: "#742774"
      }
    ]
  };

  const legend = {
    display: false,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };

  const options = {
    title: {
      display: false,
      text: "Chart Title"
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            display: true,
            borderDash: [8, 4]
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100,
            major: {
              enabled: false 
            },
            stepSize: 20,
            callback: function(value, index, values) {
              return value !== 0 ? value + '%' : '';
            }
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function(value, index, values) {
              return value !== 0 ? value + "''" : value;
            }
          }
        }        
      ]
    }
  };
  return (
    <div>
      <label className="charts-title">
        Attention level on time
      </label>
      <div className="charts-emotion-wrapper">
        <div className="form-group">
          <div className="rounded-select-button">
            <select>
              <option>22~23</option>
              <option>22~23</option>
              <option>22~23</option>
            </select>
          </div>
        </div>
        <Line data={data} legend={legend} options={options} height={50}/>
      </div>
    </div>
  )
}
export default AttentionChart