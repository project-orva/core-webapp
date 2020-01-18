import React from 'react';

import { Line } from 'react-chartjs-2';

export default ({ color, data, fill }) => (
    <Line data={{
        labels: [
          new Date(Date.now() - 1000* (60*10)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*7.5)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*5)).toLocaleTimeString(),
          new Date(Date.now() - 1000* (60*2.5)).toLocaleTimeString(),
          new Date().toLocaleTimeString()
        ],
        datasets: [{
            fill: fill,
            backgroundColor: `rgb(${color},0.2)`,
            borderColor: `rgb(${color},1)`,
            borderWidth: 1,
            hoverBackgroundColor: `rgb(${color},0.4)`,
            hoverBorderColor: `rgb(${color},1)`,
            data: data,
        }],
    }} options={{
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
            }],
            yAxes: [{
                gridLines: {
                    display: true,
                    color: 'rgba(45,50,73,1)',
                    lineWidth: 1,
                    drawTicks: false,
                    drawBorder: false,
                },
            }],
        }
    }} />
)