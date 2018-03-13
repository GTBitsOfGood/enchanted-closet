import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Radium from 'radium';
import { uploadImage } from '../actions/index';

import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image, Button } from 'semantic-ui-react'

class Upload extends Component {
    constructor(props) {
    super(props);
        this.state ={
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault()
        const {dispatch} = this.props;
        console.log(this.state);
        console.log(this.props);
        dispatch(uploadImage(this.state));// Stop form submit
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

const mapStateToProps = (state) => {
    return {
        file: state.file
    };
};

export default connect(mapStateToProps)(Upload);
