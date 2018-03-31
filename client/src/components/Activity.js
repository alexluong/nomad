import React, { Component } from "react";

export default class Activity extends Component {
  render() {
    const { activity } = this.props;
    console.log(activity);
    return (
      <div className="activity">
        <div>{activity.actName}</div>
        <div>Hi</div>
      </div>
    );
  }
}