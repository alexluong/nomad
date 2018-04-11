import React, { Component } from 'react';
import List from './List';

class DashboardListPage extends Component {
  render() {
    return (
      <div className="dashboard">
        <List list={this.props.location.state.list} fullList={true} />
      </div>
    );
  }
}

export default DashboardListPage;