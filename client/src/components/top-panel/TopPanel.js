import React, { Component } from "react";
import TopPanelPrimary from './TopPanelPrimary';
import TopPanelSecondary from './TopPanelSecondary';

export default class TopPanel extends Component {
  render() {
    return (
      <div className="top-panel">
        <TopPanelPrimary />
        <TopPanelSecondary />
      </div>
    );
  }
}