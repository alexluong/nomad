import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class SampleComponent extends Component {
  render() {
    return (
      <ul className="sidebar">
        <li className="sidebar__item">LOGO</li>
        <li className="sidebar__item"><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li className="sidebar__item"><NavLink to="/progress">Progress</NavLink></li>
        <li className="sidebar__item"><NavLink to="/profile">Profile</NavLink></li>
        <li className="sidebar__item"><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    );
  }
}