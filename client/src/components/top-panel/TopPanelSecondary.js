import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
import { withRouter } from 'react-router'

class TopPanelSecondary extends Component {
  render() {
    return (
      <div className="top-panel__secondary">
        <p>{this.props.location.pathname.slice(1)}</p>
      </div>
    );
  }
}

export default withRouter(TopPanelSecondary);