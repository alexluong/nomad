import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doSampleAction } from '../actions/index';
import { bindActionCreators } from 'redux';
import RaisedButton from "material-ui/RaisedButton";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class SampleContainer extends Component {
  render() {
    console.log(this.props);
    const { sample, sampleAction } = this.props;
    console.log(sampleAction);
    return (
      <Card>
        <CardHeader title="Card from SampleContainer" subtitle={sample.sampleText} />
        <CardActions>
          <RaisedButton
            label="Click Me"
            primary={true}
            onClick={() => this.props.doSampleAction('Hello from SampleContainer')}
          />
        </CardActions>
        <CardText>{sampleAction ? sampleAction : "Hi"}</CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    sample: state.sample,
    sampleAction: state.actionSample
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever doSampleAction is called, the result would be passed to all reducers
  return bindActionCreators({ doSampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);