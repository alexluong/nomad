import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class Breadcrumb extends Component {
  render() {
    const { visible, listName } = this.props;
    return (
      <div className="breadcrumb">
        <Link
          style={{ visibility: `${visible ? 'visible' : 'hidden'}` }}
          to="/dashboard"
          className="breadcrumb__link"
        >
          <img src="icons/back.svg" alt="back" className="breadcrumb__link-icon" />
        </Link>
        <Link to="/dashboard">Dashboard</Link>
        {
          visible ? (
            <span>
              <img src="icons/arrow-black.svg" alt="arrow" className="breadcrumb__arrow" />
              <span>{listName}</span>
            </span>
          ) : null
        }
      </div>
    );
  }
}