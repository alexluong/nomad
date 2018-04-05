import React, { Component } from "react";

export default class Activity extends Component {
  state = {
    hover: false
  }

  /* Parameter `box` to know which icon is being hovered
   * Parameter `hover` to know if it's hovered or not
   */
  onBoxHover = (event, isHovering) => {
    event.stopPropagation();
    this.setState({ hover: isHovering });
  }

  onBoxClick = (event) => {
    event.stopPropagation();
    console.log('hello');
  }

  onIgnoreClick = (event) => {
    event.stopPropagation();
    console.log('ignore');
  }

  onCheckClick = (event) => {
    event.stopPropagation();
    console.log('check');
  }

  render() {
    const { activity } = this.props;
    return (
      <div
        className="activity"
        onMouseOver={(e) => this.onBoxHover(e, true)}
        onMouseLeave={(e) => this.onBoxHover(e, false)}
      >
        <div>{activity.name}</div>
        <div className="activity__icon-box">
          <img className="activity__icon" src="/icons/checkbox.svg" alt="checkbox" onClick={this.onBoxClick} />
          { 
            this.state.hover || this.state.otherHover ? (
              [
                <img className="activity__icon-ignore" src="/icons/delete.svg" alt="delete" onClick={this.onIgnoreClick} key={1} />,
                <img className="activity__icon-check" src="/icons/arrow.svg" alt="check" onClick={this.onCheckClick} key={2} />
              ]
            ) : (null)
          }
        </div>
      </div>
    );
  }
}