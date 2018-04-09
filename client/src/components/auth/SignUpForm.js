import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { signUp } from '../../actions/index';

class SignUpForm extends Component {
  onSignUp = ({ username, email, password }) => {
    this.props.signUp({ username, email, password });
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <div>
        { errorMessage ? (
          <p>{errorMessage}</p>
        ) : null }
        <form onSubmit={handleSubmit(this.onSignUp)}>
          <Field name="username" component="input" type="text" placeholder="Username" />
          <Field name="email" component="input" type="email" placeholder="Email" />
          <Field name="password" component="input" type="password" placeholder="Password" />
          <button action="submit" className="btn">Sign Up</button>
          <Link to="/signin">Already have an account? Sign in here.</Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.errorMessage };
}

export default reduxForm({
  form: 'signup',
  fields: ['username', 'email', 'password']
})(
  connect(mapStateToProps, { signUp })(SignUpForm)
);