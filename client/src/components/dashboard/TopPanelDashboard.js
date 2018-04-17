import React, { Component } from 'react';
import { connect }          from 'react-redux';
import { changePage }       from '../../actions';

class TopPanelDashboard extends Component {
  state = {
    active: 'all-lists'
  }

  componentWillReceiveProps(nextProps) {
    try {
      this.setState({ active: nextProps.navigation.page });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick(page) {
    this.props.changePage(page);
  }

  render() {
    const { active } = this.state;
    const className = {
      active: 'top-panel-dashboard__item active',
      inactive: 'top-panel-dashboard__item'
    }
    return (
      <div className="top-panel-dashboard">
        <span className={active === 'all-lists'   ? className.active : className.inactive} onClick={(e) => this.handleClick('all-lists'  )}>All Lists</span>
        <span className={active === 'in-progress' ? className.active : className.inactive} onClick={(e) => this.handleClick('in-progress')}>In Progress</span>
        <span className={active === 'finished'    ? className.active : className.inactive} onClick={(e) => this.handleClick('finished'   )}>Finished</span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    navigation: state.navigation
  }
}

export default connect(mapStateToProps, { changePage })(TopPanelDashboard);