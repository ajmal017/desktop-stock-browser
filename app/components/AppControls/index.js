import React, { Component } from 'react';

const remote = require('electron').remote;


export default class AppControls extends Component {
  constructor() {
    super();
    this.window = remote.getCurrentWindow();
    this.handleClose = this.handleClose.bind(this);
    this.handleMax = this.handleMax.bind(this);
    this.handleMin = this.handleMin.bind(this);
  }

  componentDidMount() {
    document.getElementById('close-window').addEventListener('click', this.handleClose);
    document.getElementById('minimize-window').addEventListener('click', this.handleMin);
    document.getElementById('maximize-window').addEventListener('click', this.handleMax);
  }

  componentWillUnmount() {
    document.getElementById('close-window').removeEventListener('click', this.handleClose);
    document.getElementById('minimize-window').removeEventListener('click', this.handleMin);
    document.getElementById('maximize-window').removeEventListener('click', this.handleMax);
  }

  handleClose() {
    this.window.close();
  }

  handleMin() {
    this.window.minimize();
  }

  handleMax() {
    this.window.setFullScreen(!window.isFullScreen());
  }

  render() {
    return (
      <div className="window-controls">
        <div className="buttons">
          <div className="button close" id="close-window" />
          <div className="button minimize" id="minimize-window" />
          <div className="button maximize" id="maximize-window" />
        </div>
      </div>);
  }
}
