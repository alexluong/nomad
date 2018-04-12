import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class SidePanel extends Component {
  render() {
    return (
      <ul className="side-panel">
        <li className="side-panel__item side-panel__logo"><p>LOGO</p></li>
        <li className="side-panel__item"><NavLink to="/dashboard"><img src="icons/dashboard.svg" alt="dashboard"/></NavLink></li>
        <li className="side-panel__item"><NavLink to="/progress"><img src="icons/progress.svg" alt="progress"/></NavLink></li>
        <li className="side-panel__item"><NavLink to="/profile"><img src="icons/profile.svg" alt="profile"/></NavLink></li>
        <li className="side-panel__item"><NavLink to="/settings"><img src="icons/settings.svg" alt="settings"/></NavLink></li>
      </ul>
    );
  }
}