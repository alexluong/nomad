import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
  onSignIn({ email, password }) {
    this.props.signIn({ email, password });
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
        <form onSubmit={handleSubmit(this.onSignIn.bind(this))}>
          <Field name="email" type="text" placeholder="Email/Username" component={this.renderInput} />
          <Field name="password" component={this.renderInput} type="password" placeholder="Password" />
          <button action="submit" className="btn">Sign in</button>
          <Link to="/dashboard" className="btn">Continue without Sign in</Link>
          <Link to="/signup">Don't have an account? Create one.</Link>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required.';
  }
  if (!values.password) {
    errors.password = 'Password is required.';
  }
  return errors;
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.errorMessage };
}

export default reduxForm({
  form: 'signin',
  validate,
  fields: ['email', 'password']
})(
  connect(mapStateToProps, { signIn })(SignInForm)
);