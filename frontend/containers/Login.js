import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FileForm from '../components/CustomForm';
import { Container, Card, Grid, Reveal, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import { performAdminLogin } from '../actions/index';

import { showLoader, hideLoader } from '../actions/index';

import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {loggedIn, modalLoaderActive, performAdminLogin} = this.props;
        if (loggedIn) {
            return <Redirect to="/events" />;
        } else {
            return (
            <Container>
                <Dimmer active={modalLoaderActive}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Card fluid color='purple'>
                    <Card.Content header='Login' />
                    <Card.Content>
                        <FileForm type="login" onClick={performAdminLogin} />
                    </Card.Content>
                </Card>
            </Container>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        modalLoaderActive: state.modalLoaderActive,
        loggedIn: (state.user && state.apiToken)
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        performAdminLogin: performAdminLogin
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
