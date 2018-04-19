import React, { Component } from "react";
import { withRouter }       from 'react-router';
import { NavLink }          from 'react-router-dom';

class SidePanel extends Component {
  renderLink(page) {
    const active = this.props.location.pathname.slice(1);
    let href = `/${page}`;
    let src  = `icons/${page}${ active === page ? '-active' : ''}.svg`;
    let alt  = page;
    return <NavLink to={href}><img src={src} alt={alt} /></NavLink>;
  }

  render() {
    return (
      <ul className="side-panel">
        <li className="side-panel__item side-panel__logo"><p>LOGO</p></li>
        <li className="side-panel__item">{ this.renderLink('dashboard') }</li>
        <li className="side-panel__item">{ this.renderLink('progress' ) }</li>
        <li className="side-panel__item">{ this.renderLink('profile'  ) }</li>
        <li className="side-panel__item">{ this.renderLink('settings' ) }</li>
      </ul>
    );
  }
}

export default withRouter(SidePanel);