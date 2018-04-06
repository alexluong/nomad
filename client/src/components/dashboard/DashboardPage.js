import React, { Component } from "react";
import { connect } from 'react-redux';

import List from './List';

class DashboardPage extends Component {
  render() {
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
  return { clientLists: state.lists.clientData };
}

export default connect(mapStateToProps, null)(DashboardPage);