import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FileForm } from '../components/CustomForm';
import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image } from 'semantic-ui-react'

import { performLogin } from '../actions/index';

import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {loggedIn, modalLoaderActive, performLogin, errorMessage} = this.props;
        if (loggedIn) {
            return <Redirect to="/" />;
        } else {
            return (
            <Container>
                <Dimmer active={modalLoaderActive}>
                    <Loader>Loading</Loader>
                </Dimmer>
                {errorMessage &&
                    <Message
                        error
                        header='Oops an error occurred!'
                        content={errorMessage}
                    />
                }
                <Card fluid color='purple'>
                    <Card.Content header='Login' />
                    <Card.Content>
                        <FileForm type="login" submitRoute="login" buttonAction={performLogin} />
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
        loggedIn: state.user,
        errorMessage: state.errorMessage
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        performLogin: performLogin
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
