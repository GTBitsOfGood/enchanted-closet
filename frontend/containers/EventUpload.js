import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadEventImage } from '../actions/index';

import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image, Button } from 'semantic-ui-react'

class EventUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onChange = this.onChange.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault()
    this.props.uploadEventImage(this.state);
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  render() {
    return (
      <center>
        <form onSubmit={e => this.onFormSubmit(e)}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </center>
    )
  }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    uploadEventImage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventUpload);
