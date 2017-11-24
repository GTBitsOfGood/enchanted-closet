import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileForm from '../components/CustomForm';
import { Container, Card, Grid, Reveal, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import { performRegistration } from '../actions/index';

import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {modalLoaderActive, performRegistration} = this.props;
        return (
        <Container>
            <Dimmer active={modalLoaderActive}>
                <Loader>Loading</Loader>
            </Dimmer>
            <Card fluid color='purple'>
                <Card.Content header='Register' />
                <Card.Content>
                    <FileForm type="register" onClick={performRegistration} />
                </Card.Content>
            </Card>
        </Container>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        modalLoaderActive: state.modalLoaderActive
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        performRegistration: performRegistration
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
