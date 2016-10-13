import React from 'react'; // eslint-disable-line
import styles from './styles.css';
import { debounce } from '../../utils/utils';
import { buildChart } from './initializer';

const initalClientWidth = '1400';
const shouldDestroyAndRedrawChart = (nextProps, currentProps) =>
  nextProps.symbol !== currentProps.symbol || nextProps.range !== currentProps.range;

class StockChart extends React.Component {
  constructor() {
    super();
    this.state = {
      currentContainerWidth: initalClientWidth,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentDidMount() {
    this.chartElement = document.getElementById('stockChartElement');
    this.chart = buildChart(this.props.data, this.chartElement);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && shouldDestroyAndRedrawChart(nextProps, this.props)) {
      this.chart.destroy();
      this.chart = buildChart(nextProps.data, this.chartElement, nextProps.range);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(e) {
    debounce(this.setState({
      currentContainerWidth: `${e.target.outerWidth}`,
    }));
  }

  render() {
    return (
      <div
        className={styles.stockChart}
      >
        <canvas
          id="stockChartElement"
          className={styles.stockChart__canvas}
          height="400"
          width={this.state.currentContainerWidth}
        />
      </div>
    );
  }
}

StockChart.propTypes = {
  data: React.PropTypes.object,
};

export default StockChart;
