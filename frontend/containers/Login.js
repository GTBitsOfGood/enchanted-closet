import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import FileForm from '../components/CustomForm';
import { Container, Grid, Reveal, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import { showLoader, hideLoader } from '../actions/index';

const Login = ({ modalLoaderActive, performLogin }) => {
    return (
    	<Container>
    		<Dimmer active={modalLoaderActive}>
				<Loader>Loading</Loader>
    		</Dimmer>
	        <FileForm type="login" onClick={performLogin} />
	    </Container>
    );
};

Login.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    	modalLoaderActive: state.modalLoaderActive || false
    };
};

const mapDispatchToProps = (dispatch ) => ({
	performLogin() {
		return () => {
			dispatch(showLoader());
		}
	}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
