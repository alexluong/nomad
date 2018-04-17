import React, { Component } from "react";

export default class TopPanelDashboard extends Component {
  handleClick(page) {
    console.log(page);
  }

  render() {
    // const { active } = this.props;
    const active = 'all-lists';
    const className = {
      active: 'top-panel-dashboard__item active',
      inactive: 'top-panel-dashboard__item'
    }
    return (
      <div className="top-panel-dashboard">
        <span className={active === 'all-lists'   ? className.active : className.inactive} onClick={(e) => this.handleClick('all-lists'  )}>All Lists</span>
        <span className={active === 'in-progress' ? className.active : className.inactive} onClick={(e) => this.handleClick('in-progress')}>In Progress</span>
        <span className={active === 'finished'    ? className.active : className.inactive} onClick={(e) => this.handleClick('finished'   )}>Finished</span>
      </div>
    );
  }
}