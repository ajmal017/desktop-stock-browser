// @flow
import React, { Component, PropTypes } from 'react';
import styles from './styles.css';
import Navigation from '../Navigation';

export default class App extends Component {
  render() {
    return (
      <div className={styles.appContainer}>
        <Navigation />
        <div
          className={styles.appContainer__content}
          id="mainAppContent"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

