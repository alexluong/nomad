import React from 'react';

const Info = (props) => (
  <div className="signin__info">
    <div className="signin__info-content">
      <h1 className="heading-primary">Welcome to the User Area</h1>
      <h2>Why Sign in?</h2>
      <div className="info-boxes">
        <div className="info-box">
          <h3>Not Signed In</h3>
          <ul>
            <li>View all lists</li>
            <li><s>Get personalized lists</s></li>
            <li><s>Add new lists</s></li>
            <li><s>Check the tasks</s></li>
            <li><s>Track progress</s></li>
          </ul>
        </div>
        <div className="info-box">
          <h3>Signed In</h3>
          <ul>
            <li>View all lists</li>
            <li>Get personalized lists</li>
            <li>Add new lists</li>
            <li>Check the tasks</li>
            <li>Track progress</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default Info;