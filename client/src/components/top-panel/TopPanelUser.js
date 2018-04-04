import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TopPanelUser extends Component {
  render() {
    if (this.props.authenticated) return <Link to='/signout'>Sign Out</Link>;
    else return <Link to='/signin'>Sign In</Link>;
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(TopPanelUser);