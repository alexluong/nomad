import React, { Component } from "react";
import { Link } from 'react-router-dom';

export default class TopPanelUser extends Component {
  render() {
    return (
      <Link to='/signin'>Sign In</Link>
    );
  }
}