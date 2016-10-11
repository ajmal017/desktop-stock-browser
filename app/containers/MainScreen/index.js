import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <div>
        <button> Hello</button>
      </div>
    );
  }
}

Main.propTypes = {
  callFunction: React.PropTypes.func,
};

export default connect(null, null)(Main);
