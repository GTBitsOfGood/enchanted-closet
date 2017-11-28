import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FileForm } from '../components/CustomForm';
import { Container, Card, Grid, Reveal, Dimmer, Loader, Segment, Message, Image } from 'semantic-ui-react'

import { performLogin } from '../actions/index';

import { Redirect } from 'react-router-dom';
import Radium from 'radium';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {loggedIn, modalLoaderActive, performLogin, errorMessage} = this.props;
	const imgL = "/images/EC_dress2-01.png";
	const imgR = "/images/EC_dress4-01.png";

	var styles = {
	    margin: {
		margin: '2em',
	    }
	};

        if (loggedIn) {
            return <Redirect to="/" />;
        } else {
            return (
                <Grid style={styles.margin} columns='three' relaxed centered>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Image src={imgL} size='medium' centered />
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Container text centered>
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
                                <Card fluid color='purple' >
                                    <Card.Content header='Login' />
                                    <Card.Content>
                                        <FileForm type="login" isInline="true" submitRoute="login" buttonAction={performLogin} />
                                    </Card.Content>
                                </Card>
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Image src={imgR} size='medium' centered />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
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
