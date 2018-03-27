import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { withRouter } from 'react-router'
import './TopBar.css';

class SecondaryTopBar extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="topbar topbar-secondary">
        <RaisedButton label={this.props.location.pathname.slice(1)} />
      </div>
    );
  }
}

export default withRouter(SecondaryTopBar);