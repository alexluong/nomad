import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
  onSignIn({ email, password }) {
    this.props.signIn({ email, password });
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <div>
        { errorMessage ? (
          <p>{errorMessage}</p>
        ) : null }
        <form onSubmit={handleSubmit(this.onSignIn.bind(this))}>
          <Field name="email" component="input" type="text" placeholder="Email" />
          <Field name="password" component="input" type="password" placeholder="Password" />
          <button action="submit" className="btn">Sign in</button>
          <Link to="/dashboard" className="btn">Continue without Sign in</Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect(mapStateToProps, { signIn })(SignInForm)
);