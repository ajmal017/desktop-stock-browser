import React from 'react';
import styles from './pulse.css';

const pulse = ({ isActive }) => (
  <span
    className={styles.pingContainer}
  >
    { isActive ? <span className={styles.ping} /> : null}
  </span>
);

pulse.propTypes = {
  isActive: React.PropTypes.bool,
};

export default pulse;
