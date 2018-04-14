import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadUserImage } from '../actions/index';

import { Button, Container, Form, Header } from 'semantic-ui-react'

class UserUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onChange = this.onChange.bind(this)
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.uploadUserImage(this.state);
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  render() {
    return (
      <Container>
	<center>
          <Form onSubmit={e => this.onFormSubmit(e)}>
            <Header as='h1'> File Upload </Header>
            <Form.Input type="file" onChange={this.onChange} />
            <Button type="submit">Upload</Button>
          </Form>
	</center>
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    uploadUserImage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpload);
