import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import FileForm from '../components/CustomForm';

import { Container, Grid, Reveal } from 'semantic-ui-react';

const Login = () => {
    return (
        <FileForm type="login" />
    );
};

Login.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch ) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
