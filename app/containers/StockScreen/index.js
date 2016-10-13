import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StockChart from '../../components/StockChart';
import { selectStockParams, selectIndividualStockData, selectChartStockData } from '../MainScreen/selectors';
import { fetchStockData, selectNewRange } from '../MainScreen/actions';
import styles from './styles.css';
import { deduceColor, splitDollarAmount, parseDollarAmount } from './utils';

const rangeButtons = [
  '1d',
  '5d',
  '1m',
  '3m',
  '1y',
  '5y',
  'my'
];

class StockScreen extends React.Component {
  render() {
    if (!this.props.stockData) {
      return null;
    }
    const { stockData } = this.props;
    const [fullDollarAmount, decimalDollarAmount] = splitDollarAmount(stockData.google.l);
    const shouldRenderAfteHours = !!Number(stockData.google.ec);
    return (
      <div className={styles.stockScreenContainer}>
        <div className={styles.stockScreenContainerHeader}>
          <div className={styles.headerContainer}>
            <p className={styles.headerContainer__price}>
              <span className={styles.headerContainer__dollarSign}>$</span>
              {fullDollarAmount}
              <span
                className={styles.headerContainer__decimalAmount}
                style={{
                  color: deduceColor(stockData.google.c),
                }}
              >.
                {decimalDollarAmount}
              </span>
            </p>
            {shouldRenderAfteHours ? <p
              className={styles.headerContainer__afterHours}
            >After Hours Price: ${stockData.google.el}</p> : null}
            <div className={styles.headerContainer__changeContainer}>
              <div className={styles.headerContainer__changeContainerSection}>
                <p
                  className={styles.headerContainer__changeAmount}
                  style={{
                    color: deduceColor(stockData.google.c),
                  }}
                >
                  {stockData.google.c} ({stockData.google.cp}%)
                </p>
                <span className={styles.headerContainer__changeAmountLabel}>DAILY CHANGE</span>
              </div>
              {shouldRenderAfteHours ?
                <div className={styles.headerContainer__changeContainerSection}>
                  <p
                    className={styles.headerContainer__changeAmount}
                    style={{
                      color: deduceColor(stockData.google.ec),
                    }}
                  >
                    {stockData.google.ec} ({stockData.google.ecp}%)
                  </p>
                  <span className={styles.headerContainer__changeAmountLabel}>AFTER HOURS</span>
                </div> : null}
            </div>
            <div className={styles.headerContainer__metaData}>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>LOW</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${parseDollarAmount(stockData.yahoo.ranges.low.min)}
                </span>
              </div>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>OPEN</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${parseDollarAmount((stockData.yahoo.ranges.open.min
                    + stockData.yahoo.ranges.open.max) / 2)}
                </span>
              </div>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>HIGH</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${parseDollarAmount(stockData.yahoo.ranges.high.max)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stockScreenContainerChart}>
          <StockChart
            data={this.props.chartData}
            symbol={stockData.google.t}
          />
        </div>
        <div className={styles.stockScreenContainerButtons}>
          {rangeButtons.map((each) =>
            <button
              className={styles.rangeSelector}
              onClick={() => this.props.selectNewRange(each)}
              key={each}
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
};

const mapDispatchToProps = dispatch => ({
  onLoadStockData: (stockData) => dispatch(fetchStockData(stockData.symbol, stockData.exchDisp)),
  selectNewRange: (newRange) => dispatch(selectNewRange(newRange)),
});

const mapStateToProps = createStructuredSelector({
  stockParams: selectStockParams(),
  stockData: selectIndividualStockData(),
  chartData: selectChartStockData(),
});


export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);
