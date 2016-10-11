import React from 'react';
import styles from './styles.css';

class StockScreen extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <div className={styles.stockScreenContainer}>
        <li>Hello</li>
      </div>
    );
  }
}

export default StockScreen;
