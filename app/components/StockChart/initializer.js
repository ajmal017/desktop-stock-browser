import Chart from 'chart.js'; // eslint-disable-line
import moment from 'moment';

const SCALE_STEPS = 5;
const formatMapping = {
  '1d': 'hh:mma'
};

const buildChart = ({ value, time }, chartElement) => new Chart(chartElement, {
  type: 'line',
  data: {
    labels: time,
    datasets: [
      {
        lineTension: 0,
        fill: true,
        backgroundColor: "rgba(255, 255, 255, 1)",
        cubicInterpolationMode: 'default',
        borderColor: "white",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        data: value,
        spanGaps: false,
      }
    ]
  },
  options: {
    showTooltips: false,
    scaleOveride: true,
    scaleSteps: SCALE_STEPS,
    scaleStepWidth: Math.ceil(Math.max(...value) / SCALE_STEPS),
    scaleStartValue: 0,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          parser: (data) => moment.unix(data),
        },
        ticks: {
          callback: (dataValue, index) => {
            if (index % 2 === 0) {
              return dataValue;
            }
            return null;
          }
        }
      }]
    },
    tooltips: {
      mode: 'x-axis',
      titleFontFamily: 'DIN',
      labelFontFamily: 'DIN',
      labelFontSize: 12,
      titleFontSize: 14,
      callbacks: {
        label: (data) => `$${data.yLabel.toFixed(2)}`,
        title: (element) => moment.unix(element[0].xLabel).format(formatMapping['1d'])
      }
    }
  }
});

export default {
  buildChart,
};
