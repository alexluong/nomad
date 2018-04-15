import React, { Component } from "react";

export default class TopPanelDashboard extends Component {
  handleClick(page) {
    console.log(page);
  }

  render() {
    return (
      <div className="top-panel-dashboard">
        <span className="top-panel-dashboard__item" onClick={(e) => this.handleClick('all-lists'  )}>All Lists</span>
        <span className="top-panel-dashboard__item" onClick={(e) => this.handleClick('in-progress')}>In Progress</span>
        <span className="top-panel-dashboard__item" onClick={(e) => this.handleClick('finished'   )}>Finished</span>
      </div>
    );
  }
}