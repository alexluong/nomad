import React, { Component } from "react";
import { connect } from 'react-redux';
import { signOut } from '../../actions/index';

class SignInPage extends Component {
  componentWillMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>We're sorry to see you go...</div>
    );
  }
}

export default connect(null, { signOut })(SignInPage);