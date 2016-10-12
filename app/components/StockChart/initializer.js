import Chart from 'chart.js'; // eslint-disable-line

const SCALE_STEPS = 10;

const buildChart = ({ value, time }, chartElement) => new Chart(chartElement, {
  type: 'line',
  data: {
    labels: time,
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value,
        spanGaps: false,
      }
    ]
  },
  options: {
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
        ticks: {
          callback: (dataValue, index) => {
            if (index % 4 === 0) {
              return dataValue;
            }
            return null;
          }
        }
      }]
    }
  }
});

export default {
  buildChart,
};
