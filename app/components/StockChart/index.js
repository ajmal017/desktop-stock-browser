import React from 'react'; // eslint-disable-line
import styles from './styles.css';
import { debounce } from '../../utils/utils';
import { buildChart } from './initializer';

const initalClientWidth = '1400';

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
    this.chartContainer = document.getElementById('stockChartElementContainer');
    this.chart = buildChart(this.props.data, this.chartElement);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data
    && nextProps.symbol
    !== this.props.symbol) {
      this.chart.destroy();
      this.chart = buildChart(nextProps.data, this.chartElement);
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
    console.log(this.props);
    return (
      <div
        className={styles.stockChart}
        id="stockChartElementContainer"
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
  symbol: React.PropTypes.string,
  data: React.PropTypes.object,
};

export default StockChart;
