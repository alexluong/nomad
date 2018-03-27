import React, { Component } from "react";
import { connect } from 'react-redux';
import { signIn } from '../../actions/index';
import { bindActionCreators } from 'redux';
import RaisedButton from "material-ui/RaisedButton";

class TopBarUser extends Component {
  onSubmit() {
    this.props.signIn({ email: null, password: null });
  }

  render() {
    const { auth: { authenticated } } = this.props;
    return (
      <span>
        {
          authenticated ? (
            'Hello'
          ) : (
            <RaisedButton onClick={this.onSubmit.bind(this)} label="Sign In" />
          )
        }
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBarUser);