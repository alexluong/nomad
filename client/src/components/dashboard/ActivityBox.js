import React, { Component } from "react";

export default class ActivityBox extends Component {
  render() {
    const { activity } = this.props;
    console.log(activity);

    return (
      <div className="activity-box">
        <h2>{activity.name}</h2>
        <small><u>Status:</u> {activity.status}</small>
        <p dangerouslySetInnerHTML={{__html: activity.description}} />
      </div>
    );
  }
}