import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
import TopPanelUser from './TopPanelUser';

export default class TopPanelPrimary extends Component {
  render() {
    return (
      <div className="top-panel__primary">
        <div>
          <button>TopBar</button>
        </div>
        <div className="top-panel__primary-side">
          <span>Hi, Nomad!</span>
          <TopPanelUser />
        </div>
      </div>
    );
  }
}