import React, { Component } from "react";
import Activity from './Activity';
import ProgressBar from './ProgressBar';
import { history } from '../../App';

export default class List extends Component {
  constructor(props) {
    super(props);

    const actPerPage = !props.fullList ? 3 : 20;
    const numPage = Math.ceil(props.list.activities.length / actPerPage);
    this.state = {
      actPerPage,
      numPage,
      activePage: 0
    }
  }

  handleListClick = (e) => {
    history.push({
      pathname: '/dashboard/list',
      state: {
        list: this.props.list
      }
    });
  }

  handleChangePage(event, up) {
    event.stopPropagation();
    this.setState({
      activePage: up ? this.state.activePage + 1 : this.state.activePage - 1
    });
  }

  renderPaginationControl() {
    const { activePage, numPage } = this.state;
    console.log(this.state);
    if (numPage > 1)
      return (
        <div className="card__footer">
          {
            activePage !== 0 ? (
              <span onClick={(event) => this.handleChangePage(event, false)} >&lt; less</span>
            ) : (<span></span>)
          }
          {
            activePage !== numPage - 1 ? (
              <span onClick={(event) => this.handleChangePage(event, true)} >more &gt;</span>
            ) : (<span></span>)
          }
        </div>
      );
  }

  render() {
    const { list, fullList } = this.props;
    const { activePage, actPerPage } = this.state;
    const placeholderImg = '/img/list-header.jpeg';

    return (
      <div>
        <div className={`card${fullList && ' full-card'}`} onClick={this.handleListClick} >
          <div
            className="card__header"
            style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), #fff), url(${placeholderImg})`}}>
            <h2 className="card__header-heading">{list.name}</h2>
          </div>
          <div className="card__main">
            {
              list.activities
                .filter((e,i) => i >= activePage * actPerPage && i < (activePage + 1) * actPerPage)
                .map((activity, i) => {
                  return <Activity key={i} activity={activity} listId={list._id} />
                })
            }
          </div>
          {this.renderPaginationControl()}
        </div>
        <ProgressBar progress={80} />
      </div>
    );
  }
}