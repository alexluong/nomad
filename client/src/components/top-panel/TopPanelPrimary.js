import React, { Component } from "react";
// import RaisedButton from "material-ui/RaisedButton";
import TopPanelUser from './TopPanelUser';

export default class TopPanelPrimary extends Component {
  onSearchClick = () => {
    console.log('search');
  }

  onNotificationClick = () => {
    console.log('notification');
  }

  render() {
    return (
      <div className="top-panel__primary">
        <div className="top-panel__primary-first">
        <span className="search-bar">
          <input type="text" placeholder="Search anything here..." />
          <img src="/icons/search.svg" alt="search" onClick={this.onSearchClick} />
        </span>
          <img src="/icons/notifications.svg" alt="notifications" onClick={this.onNotificationClick} />
        </div>
        <div className="top-panel__primary-second">
          <span>Hi, Nomad!</span>
          <TopPanelUser />
        </div>
      </div>
    );
  }
}