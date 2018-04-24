import React, { Component } from "react";
import { connect } from 'react-redux';
import { signOut } from '../../actions/index';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  componentWillMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>
        <p>We're sorry to see you go...</p>
        <Link to="/signin">Go to Sign In</Link>
      </div>
    );
  }
}

export default connect(null, { signOut })(SignInPage);