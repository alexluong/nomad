import React, { Component } from "react";
import { withRouter }       from 'react-router';
import { NavLink }          from 'react-router-dom';

class SidePanel extends Component {
  state = {
    page: '',
    animationDirection: ''
  }
  onHover(event, page) {
    const target = event.currentTarget;
    const x = event.pageX - target.offsetLeft;
    const y = event.pageY - target.offsetTop;
    const edge = this.closestEdge(x, y, target.clientWidth, target.clientHeight);
    const animationDirection = edge === 'bottom' ? 'Bottom' : edge === 'top' ? 'Top' : '';
    this.setState({
      animationDirection,
      page
    });
  }

  closestEdge(x, y, w, h) {
    const topEdgeDist    = this.distMetric(x ,y, w/2, 0  );
    const bottomEdgeDist = this.distMetric(x ,y, w/2, h  );
    const leftEdgeDist   = this.distMetric(x ,y, 0  , h/2);
    const rightEdgeDist  = this.distMetric(x ,y, w  , h/2);
    const min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);
    switch (min) {
      case leftEdgeDist:
        return "left";
      case rightEdgeDist:
        return "right";
      case topEdgeDist:
        return "top";
      case bottomEdgeDist:
        return "bottom";
      default:
        return "left";
    }
  }

  // Distance Formula
  distMetric(x, y, x2, y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
  }

  renderLink(page) {
    const active = this.props.location.pathname.slice(1);
    let href = `/${page}`;
    let src  = `icons/${page}${ active.includes(page) ? '-active' : ''}.svg`;
    let alt  = page;
    return (
      <NavLink
        className={`${this.state.page === page ? ` slideFrom${this.state.animationDirection}` : ''}`}
        onAnimationEnd={() => this.setState({ page: '', animationDirection: '' })}
        to={href}
      >
        <img src={src} alt={alt}/>
      </NavLink>
    );
  }

  render() {
    return (
      <ul className="side-panel">
        <li className="side-panel__item side-panel__logo"><p>LOGO</p></li>
        <li
          onMouseEnter={(e) => this.onHover(e, 'dashboard')}
          className="side-panel__item"
        >
          { this.renderLink('dashboard') }
        </li>
        <li
          onMouseEnter={(e) => this.onHover(e, 'progress' )}
          className="side-panel__item"
        >
          { this.renderLink('progress') }
        </li>
        <li
          onMouseEnter={(e) => this.onHover(e, 'profile'  )}
          className="side-panel__item"
        >
          { this.renderLink('profile') }
        </li>
        <li
          onMouseEnter={(e) => this.onHover(e, 'settings' )}
          className="side-panel__item"
        >
          { this.renderLink('settings') }
        </li>
      </ul>
    );
  }
}

export default withRouter(SidePanel);