import React, { Component } from "react";
import { connect } from 'react-redux';
import { signIn } from '../../actions/index';
import { bindActionCreators } from 'redux';
// import RaisedButton from "material-ui/RaisedButton";

class TopPanelUser extends Component {
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
            <button onClick={this.onSubmit.bind(this)}>Sign In</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopPanelUser);