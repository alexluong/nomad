import React, { Component } from "react";
import { connect } from 'react-redux';
import { createBoard, getBoard } from '../../actions';
import { getAuthToken } from '../../localStorage';

import List from './List';

class DashboardPage extends Component {
  state = {
    authenticated: false,
    loading: false
  };

  componentDidMount() {
    const { auth, lists } = this.props;
    let authenticated, loading;
    if (auth.authenticated) {
      authenticated = true;
      if (!auth.user.hasBoard) {
        // Go create board
        loading = true;
        this.props.createBoard(getAuthToken()); 
      } else if (!lists.serverLists) {
        // Go get serverLists
        // TODO: GO GET SERVERLISTS
        loading = true;
        this.props.getBoard(getAuthToken())
      } else {
        loading = false;
      }
    } else {
      // Just render clientLists
      authenticated = false;
    }
    this.setState({ authenticated, loading });
  }


  renderLists() {
    const lists = this.state.authenticated ? this.props.lists.serverLists : this.props.lists.clientLists;
    return lists.map((list, i) => {
      return <List key={i} list={list} />
    })
  }

  renderLoading(lists) {
    // TODO: Make a Loading Screen
    return <div>Loading</div>
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="dashboard">
        { loading ? this.renderLoading() : this.renderLists() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    lists: state.lists
  };
}

export default connect(mapStateToProps, { createBoard, getBoard })(DashboardPage);