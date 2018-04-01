import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { numPage, activePage, onPageChange } = this.props;
    return (
      <div className="pagination">
        {
          [...Array(numPage)].map((e, i) => {
            return (
              <div
                key={i}
                className={`pagination__item${activePage === i ? ' active' : ''}`}
                onClick={() => onPageChange(i)}
              >
              </div>
            );
          })
        }
      </div>
    );
  }
}