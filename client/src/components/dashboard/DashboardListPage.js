import React, { Component } from 'react';
import { connect }          from 'react-redux';

import List        from './List';
import ActivityBox from './ActivityBox';

class DashboardListPage extends Component {
  state = {
    list: null
  }

  componentDidMount() {
    this.getList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getList(nextProps);
  }

  getList(props) {
    const listId = props.location.state.list._id;
    try {
      props.lists.serverLists.filter(list => {
        if (list._id === listId) {
          this.setState({ list });
        }
        return true;
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const list = this.state.list ? this.state.list : this.props.location.state.list;
    return (
      <div className="dashboard-list">
        <List list={list} fullList={true} />
        <ActivityBox activity={list.activities[0]} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    lists: state.lists
  };
};

export default connect(mapStateToProps)(DashboardListPage);