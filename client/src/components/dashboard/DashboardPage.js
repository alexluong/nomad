import React, { Component } from "react";
import { connect } from 'react-redux';
import { createBoard } from '../../actions';
import { getAuthToken } from '../../localStorage';

import List from './List';

class DashboardPage extends Component {
  
  componentDidMount() {
    if (!this.props.hasBoard) {
      this.props.createBoard(getAuthToken());
    }
  }

  render() {
    console.log(this.props);
    console.log(this.props);
    const { clientLists } = this.props;
    return (
      <div className="dashboard">
        {clientLists.map((list, i) => {
          return <List key={i} list={list} />
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    hasBoard: state.auth.user.hasBoard,
    clientLists: state.lists.clientLists,
    serverLists: state.lists.serverLists ? state.lists.serverLists : null,
    progress: state.lists.progress ? state.lists.progress : null,
  };
}

export default connect(mapStateToProps, { createBoard })(DashboardPage);