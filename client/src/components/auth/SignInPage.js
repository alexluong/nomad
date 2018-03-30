import React, { Component } from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../../actions/index';
import { Link } from 'react-router-dom';

class SignInPage extends Component {
  onSignIn({ email, password }) {
    console.log({ email,password });
    this.props.signIn({ email, password });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin">
        <div className="signin__info">Hi</div>
        <div className="signin__form">
          <div className="signin__form-box">
            <h1 className="heading-primary">Sign In</h1>
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
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(
  connect(mapStateToProps, { signIn })(SignInPage)
);