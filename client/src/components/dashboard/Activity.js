import React, { Component } from "react";

export default class Activity extends Component {
  render() {
    const { activity } = this.props;
    return (
      <div className="activity">
        <div>{activity.name}</div>
        <div>Hi</div>
      </div>
    );
  }
}