import React, { Component } from "react";
import Activity from './Activity';

export default class List extends Component {
  render() {
    const { list } = this.props;
    console.log(list);
    return (
      <div className="card">
        <div className="card__header">
          {list.listName}
        </div>
        <div className="card__main">
          {list.activities.map(activity => {
            return <Activity key={activity.actID} activity={activity} />
          })}
        </div>
      </div>
    );
  }
}