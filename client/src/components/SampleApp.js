import React, { Component } from "react";
import SampleComponent from "./SampleComponent";
import SampleContainer from "../containers/SampleContainer";

class SampleApp extends Component {
  render() {
    return (
      <div>
        <p>Hi</p>
        <SampleComponent />
        <SampleContainer />
      </div>
    );
  }
}

export default SampleApp;
