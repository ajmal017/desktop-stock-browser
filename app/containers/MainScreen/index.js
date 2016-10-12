import React from 'react';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <div
        style={{
          width: '100%',
        }}
      />
    );
  }
}

Main.propTypes = {
  callFunction: React.PropTypes.func,
};

export default connect(null, null)(Main);
