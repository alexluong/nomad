import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  onSignIn({ email, password }) {
    this.props.signIn({ email, password });
  }

  render() {
    const { handleSubmit, errorMessage } = this.props;
    return (
      <div className="signin">
        <div className="signin__info">Hi</div>
        <div className="signin__form">
          <div className="signin__form-box">
            <h1 className="heading-primary">Sign In</h1>
            {
              errorMessage ? (
                <div>{errorMessage}</div>
              ) : null
            }
            <form onSubmit={handleSubmit(this.onSignIn.bind(this))}>
              <Field name="email" component="input" type="text" placeholder="Email" />
              <Field name="password" component="input" type="password" placeholder="Password" />
              <button action="submit" className="btn">Sign in</button>
              <Link to="/dashboard" className="btn">Continue without Sign in</Link>
            </form>
          </div>
        </div>
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
  connect(mapStateToProps, { signIn })(SignInPage)
);