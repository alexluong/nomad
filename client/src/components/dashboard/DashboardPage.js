import React, { Component } from "react";
import { connect } from 'react-redux';

import List from './List';

class DashboardPage extends Component {
  render() {
    const { lists } = this.props;
    return (
      <div className="dashboard">
        {lists.data.map(list => {
          return <List key={list.listID} list={list} />
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { lists: state.lists };
}

export default connect(mapStateToProps, null)(DashboardPage);
