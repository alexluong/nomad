import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import TopBarUser from './TopBarUser';
import './TopBar.css';

export default class TopBar extends Component {
  render() {
    return (
      <div className="topbar">
        <div>
          <RaisedButton label="TopBar" />
        </div>
        <div className="topbar__user">
          <span className="hi">Hi, Nomad!</span>
          <TopBarUser />
        </div>
      </div>
    );
  }
}