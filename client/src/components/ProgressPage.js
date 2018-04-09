import React, { Component } from "react";
import { connect } from 'react-redux';

class ProgressPage extends Component {
  render() {
    return (
      <div>
        <button>Progress</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(ProgressPage);