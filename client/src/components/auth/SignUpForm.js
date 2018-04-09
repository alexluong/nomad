import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { signUp } from '../../actions/index';

class SignUpForm extends Component {
  onSignUp = ({ username, email, password }) => {
    this.props.signUp({ username, email, password });
  }

  renderInput(field) {
    const { input, type, placeholder, meta: {touched, error} } = field;
    return (
      <div>
        { touched && error ? <span>{error}</span> : null}
        <input 
          {...input}
          type={type}
          placeholder={placeholder}
        />
      </div>
    );
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
      <div>
        { errorMessage ? (
          <p>{errorMessage}</p>
        ) : null }
        <form onSubmit={handleSubmit(this.onSignUp)}>
          <Field name="username" component={this.renderInput} type="text" placeholder="Username" />
          <Field name="email" component={this.renderInput} type="email" placeholder="Email" />
          <Field name="password" component={this.renderInput} type="password" placeholder="Password" />
          <Field name="confirmPassword" component={this.renderInput} type="password" placeholder="Confirm Password" />
          <button action="submit" className="btn">Sign Up</button>
          <Link to="/signin">Already have an account? Sign in here.</Link>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  const { username, email, password, confirmPassword } = values;
  if (!username) {
    errors.username = 'Username is required';
  }
  if (!email) {
    errors.email = 'Email is required.';
  }
  if (!password) {
    errors.password = 'Password is required.';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Confirm password does not match.';
  }

  return errors;
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.errorMessage };
}

export default reduxForm({
  form: 'signup',
  validate,
  fields: ['username', 'email', 'password']
})(
  connect(mapStateToProps, { signUp })(SignUpForm)
);