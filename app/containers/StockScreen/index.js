import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StockChart from '../../components/StockChart';
import styles from './styles.css';
import { selectStockParams, selectIndividualStockData, selectChartStockData, selectStockRange } from '../MainScreen/selectors';
import { fetchStockData, selectNewRange } from '../MainScreen/redux';
import { startStockPull } from './redux';
import { selectIsFetching } from './selectors';
import { ChangeContainer, RangeContainer, BigDollar, AfterHoursChangesContainer } from '../../components/StockScreen';
import { deduceColor, splitDollarAmount, parseDollarAmount, rangeButtons } from './utils';

class StockScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isFetchingStockData && nextProps.stockData) {
      const { symbol, exchDisp } = nextProps.stockParams;
      this.props.startStockPull(symbol, exchDisp);
    }
  }

  render() {
    if (!Object.keys(this.props.stockData).length) {
      return null;
    }
    const { stockData, stockRange } = this.props;
    const [fullDollarAmount, decimalDollarAmount] = splitDollarAmount(stockData.google.l);

    return (
      <div className={styles.stockScreenContainer}>
        <div className={styles.stockScreenContainerHeader}>
          <div className={styles.headerContainer}>
            <span className={styles.headerContainer_ltt}>Since {stockData.google.lt}</span>
            <BigDollar
              fullValue={fullDollarAmount}
              decimalValue={decimalDollarAmount}
              decimalColor={deduceColor(stockData.google.c)}
            />
            <AfterHoursChangesContainer
              value={stockData.google.el}
              shouldRender={!!Number(stockData.google.ec)}
            />
            <div className={styles.headerContainer__changeContainer}>
              <ChangeContainer
                color={deduceColor(stockData.google.c)}
                value={stockData.google.c}
                percent={stockData.google.cp}
                label="DAILY CHANGE"
                shouldRender
              />
              <ChangeContainer
                color={deduceColor(stockData.google.ec)}
                value={stockData.google.ec}
                percent={stockData.google.ecp}
                label="AFTER HOURS"
                shouldRender={!!Number(stockData.google.ec)}
              />
            </div>
            <div className={styles.headerContainer__metaData}>
              <RangeContainer
                value={parseDollarAmount(stockData.yahoo.ranges.low.min)}
                label="LOW"
              />
              <RangeContainer
                value={parseDollarAmount((stockData.yahoo.ranges.open.min
                    + stockData.yahoo.ranges.open.max) / 2)}
                label="OPEN"
              />
              <RangeContainer
                value={parseDollarAmount(stockData.yahoo.ranges.high.max)}
                label="HIGH"
              />
            </div>
          </div>
        </div>
        <div className={styles.stockScreenContainerChart}>
          <StockChart
            data={this.props.chartData}
            range={this.props.stockRange}
            symbol={stockData.google.t}
          />
        </div>
        <div className={styles.stockScreenContainerButtons}>
          {rangeButtons.map((each) =>
            <button
              className={styles.rangeSelector}
              onClick={() => this.props.selectNewRange(each)}
              key={each}
              style={{
                opacity: stockRange === each ? 1 : '',
                borderBottom: stockRange === each ? '2px solid white' : '',
              }}
            >
              {each}
            </button>)}
        </div>
      </div>
    );
  }
}

StockScreen.propTypes = {
  stockData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  chartData: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  selectNewRange: React.PropTypes.func,
  stockRange: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  startStockPull: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onLoadStockData: (stockData) => dispatch(fetchStockData(stockData.symbol, stockData.exchDisp)),
  selectNewRange: (newRange) => dispatch(selectNewRange(newRange)),
  startStockPull: (symbol, exchange) => dispatch(startStockPull(symbol, exchange)),
});

const mapStateToProps = createStructuredSelector({
  stockParams: selectStockParams(),
  stockData: selectIndividualStockData(),
  stockRange: selectStockRange(),
  chartData: selectChartStockData(),
  isFetchingStockData: selectIsFetching(),
});


export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);
