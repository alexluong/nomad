import React, { Component } from "react";
import Activity from './Activity';
import Pagination from '../Pagination';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPage: Math.ceil(props.list.activities.length / 3),
      activePage: 0
    }
  }

  renderActivities() {
    const { activities } = this.props.list;
    activities.filter((e, i) => i > 0).map(activity => {
      console.log(activity);
      return <Activity key={activity.actID} activity={activity} />;
    });;
  }

  render() {
    const { list } = this.props;
    const { activePage, numPage } = this.state;
    const actPerPage = 3;

    return (
      <div className="card">
        <div className="card__header" style={{backgroundImage: `url(${list.listImgURL})`}}>
          {list.listName}
        </div>
        <div className="card__main">
          {
            list.activities
              .filter((e,i) => i >= activePage * actPerPage && i < (activePage + 1) * actPerPage)
              .map(activity => {
                return <Activity key={activity.actID} activity={activity} />
              })
          }
        </div>
        {
          numPage > 1 ? (
            <div className="card__footer">
              {
                numPage > 1 ? (
                  <div className="pagination-nav">
                    {
                      activePage !== 0 ? (
                        <span
                        onClick={() => this.setState({activePage: activePage - 1})} 
                        >Less</span>
                      ) : (<span></span>)
                    }
                    {
                      activePage !== numPage - 1 ? (
                        <span
                        onClick={() => this.setState({activePage: activePage + 1})} 
                        >More</span>
                      ) : (<span></span>)
                    }
                  </div>
                ) : (null)
              }
              <Pagination
                numPage={numPage}
                activePage={activePage}
                onPageChange={i => this.setState({activePage: i})}
              />
            </div>
          ) : (null)
        }
      </div>
    );
  }
}