import React, { Component } from 'react'      ;
import { connect }          from 'react-redux';

import List        from './List'       ;
import ActivityBox from './ActivityBox';
import Breadcrumb  from './Breadcrumb' ;

class DashboardListPage extends Component {
  state = {
    list: null,
    activity: null
  }

  componentDidMount() {
    this.getList(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getList(nextProps);
  }

  getList(props) {
    const listId = props.location.state.list._id;
    const activityId = props.location.state.activity._id;
    try {
      props.lists.serverLists.filter(list => {
        if (list._id === listId) {
          list.activities.filter(activity => {
            if (activity._id === activityId) {
              this.setState({ list, activity });
            }
            return true;
          });
        }
        return true;
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const list = this.state.list || this.props.location.state.list;
    const activity = this.state.activity || this.props.location.state.list.activities[0];
    return (
      <div className="dashboard-list">
        <Breadcrumb visible={true} listName={list.name} />
        <div className="dashboard-list__board">
          <List list={list} fullList={true} />
          <ActivityBox activity={activity} />
        </div>
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