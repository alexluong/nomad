import React, { Component } from "react";
import Activity from './Activity';
import ProgressBar from './ProgressBar';
// import Pagination from '../Pagination';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPage: Math.ceil(props.list.activities.length / 3),
      activePage: 0
    }
  }

  changePage(event, up) {
    event.stopPropagation();
    this.setState({
      activePage: up ? this.state.activePage + 1 : this.state.activePage - 1
    });
  }

  renderPaginationControl() {
    const { activePage, numPage } = this.state;
    if (numPage > 1)
      return (
        <div className="card__footer">
          {
            activePage !== 0 ? (
              <span onClick={(event) => this.changePage(event, false)} >&lt; less</span>
            ) : (<span></span>)
          }
          {
            activePage !== numPage - 1 ? (
              <span onClick={(event) => this.changePage(event, true)} >more &gt;</span>
            ) : (<span></span>)
          }
        </div>
      );
  }

  render() {
    const { list } = this.props;
    const { activePage } = this.state;
    const actPerPage = 3;
    const placeholderImg = '/img/list-header.jpeg';

    return (
      <div>
        <div className="card" onClick={() => console.log('click')} >
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
                  return <Activity key={i} activity={activity} />
                })
            }
          </div>
          {this.renderPaginationControl()}
        </div>
        <ProgressBar progress={20} />
        {/* {
          numPage > 1 ? (
            <Pagination
              numPage={numPage}
              activePage={activePage}
              onPageChange={i => this.setState({activePage: i})}
            />
          ) : (null)
        } */}
      </div>
    );
  }
}