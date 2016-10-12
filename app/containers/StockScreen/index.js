import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectStockParams, selectIndividualStockData } from '../MainScreen/selectors';
import { fetchStockData } from '../MainScreen/actions';
import styles from './styles.css';

class StockScreen extends React.Component {
  render() {
    if (!this.props.stockData) {
      return null;
    }
    const { stockData } = this.props;
    const hightLightColor = stockData.google.c > 0 ? '#01CE67' : '#F38493';
    return (
      <div className={styles.stockScreenContainer}>
        <div className={styles.stockScreenContainerHeader}>
          <div className={styles.headerContainer}>
            <p className={styles.headerContainer__price}>
              <span className={styles.headerContainer__dollarSign}>$</span>
              {stockData.google.l.split('.')[0]}
              <span
                className={styles.headerContainer__decimalAmount}
                style={{
                  color: hightLightColor,
                }}
              >.
                {this.props.stockData.google.l.split('.')[1]}
              </span>
            </p>
            <p
              className={styles.headerContainer__changeAmount}
              style={{
                color: hightLightColor,
              }}
            >
              {stockData.google.c} ({stockData.google.cp}%)
            </p>
            <div className={styles.headerContainer__metaData}>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>LOW</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${stockData.yahoo.ranges.low.min}
                </span>
              </div>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>OPEN</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${((stockData.yahoo.ranges.open.min
                    + stockData.yahoo.ranges.open.max) / 2).toFixed(2)}
                </span>
              </div>
              <div className={styles.headerContainer__metaDataContainer}>
                <span className={styles.headerContainer__metaDataContainerLabel}>HIGH</span>
                <span
                  className={styles.headerContainer__metaDataContainerValue}
                >
                  ${stockData.yahoo.ranges.high.max}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.stockScreenContainerChart}>
          <p>{this.props.stockData.google.t}</p>
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
};

const mapDispatchToProps = dispatch => ({
  onLoadStockData: (stockData) => dispatch(fetchStockData(stockData.symbol, stockData.exchDisp)),
});

const mapStateToProps = createStructuredSelector({
  stockParams: selectStockParams(),
  stockData: selectIndividualStockData(),
});


export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);
