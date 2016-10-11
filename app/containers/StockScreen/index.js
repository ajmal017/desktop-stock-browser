import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import shallowequal from 'shallowequal';
import { selectStockParams } from '../MainScreen/selectors';
import { fetchStockData } from '../MainScreen/actions';
import styles from './styles.css';

class StockScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.stockParams) {
      if (!shallowequal(nextProps.stockParams, this.props.stockParams)) {
        this.props.onLoadStockData(nextProps.stockParams);
      }
    }
  }

  render() {
    return (
      <div className={styles.stockScreenContainer}>
        <li>Hello</li>
      </div>
    );
  }
}

StockScreen.propTypes = {
  stockParams: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onLoadStockData: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onLoadStockData: (stockData) => dispatch(fetchStockData(stockData.symbol, stockData.exchDisp)),
});

const mapStateToProps = createStructuredSelector({
  stockParams: selectStockParams(),
});


export default connect(mapStateToProps, mapDispatchToProps)(StockScreen);
