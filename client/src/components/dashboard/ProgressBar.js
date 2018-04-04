import React, { Component } from "react";

export default class ProgressBar extends Component {
  render() {
    const { progress } = this.props;

    return (
      <div className="progress-bar">
        <div className="progress-bar__hide" style={{width: `calc((100% - ${progress}%))`}}></div>
      </div>
    );
  }
}