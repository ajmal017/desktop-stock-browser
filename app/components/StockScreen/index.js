import React from 'react';
import styles from './styles.css';

const ChangeContainer = ({ shouldRender, value, percent, color, label }) => {
  if (shouldRender) {
    return (
      <div className={styles.headerContainer__changeContainerSection}>
        <p
          className={styles.headerContainer__changeAmount}
          style={{
            color,
          }}
        >
          {value} ({percent}%)
        </p>
        <span className={styles.headerContainer__changeAmountLabel}>{label}</span>
      </div>
    );
  }
  return null;
};

ChangeContainer.propTypes = {
  shouldRender: React.PropTypes.bool,
  value: React.PropTypes.string,
  percent: React.PropTypes.string,
  color: React.PropTypes.string,
  label: React.PropTypes.string,
};

const RangeContainer = ({ value, label }) => (
  <div className={styles.headerContainer__metaDataContainer}>
    <span className={styles.headerContainer__metaDataContainerLabel}>{label}</span>
    <span
      className={styles.headerContainer__metaDataContainerValue}
    >
      ${value}
    </span>
  </div>
);

RangeContainer.propTypes = {
  value: React.PropTypes.string,
  label: React.PropTypes.string,
};

const BigDollar = ({ fullValue, decimalValue, decimalColor }) => (
  <p className={styles.headerContainer__price}>
    <span className={styles.headerContainer__dollarSign}>$</span>
    {fullValue}
    <span
      className={styles.headerContainer__decimalAmount}
      style={{
        color: decimalColor,
      }}
    >.
      {decimalValue}
    </span>
  </p>
);

BigDollar.propTypes = {
  fullValue: React.PropTypes.string,
  decimalValue: React.PropTypes.string,
  decimalColor: React.PropTypes.string,
};

const AfterHoursChangesContainer = ({ shouldRender, value }) => {
  if (shouldRender) {
    return (
      <p className={styles.headerContainer__afterHours}>
        After Hours Price: ${value}
      </p>
    );
  }
  return null;
};

AfterHoursChangesContainer.propTypes = {
  value: React.PropTypes.string,
  shouldRender: React.PropTypes.bool,
};

export default {
  ChangeContainer,
  RangeContainer,
  BigDollar,
  AfterHoursChangesContainer,
};
