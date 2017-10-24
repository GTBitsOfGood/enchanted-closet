import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'semantic-ui-react'

import { logoutUser } from '../actions/index';

import { withRouter } from 'react-router-dom';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    navigate(route) {
        this.props.history.push(route);
    }

    render() {
        const { applicationName, loggedIn, logoutUser } = this.props;
        const activeColor = 'violet'
        return (
        	<Menu color='grey' inverted stackable size='large'>
                <Menu.Item header color={activeColor} onClick={() => this.navigate('/')}>{applicationName}</Menu.Item>
                {loggedIn &&
                <Menu.Menu position='right'>
                    <Menu.Item color={activeColor} onClick={() => this.navigate('/events')}>Events</Menu.Item>
                    <Dropdown item text='Admin'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.navigate('/admin/dashboard')}>Dashboard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item color={activeColor} onClick={logoutUser}>Log out</Menu.Item>
                </Menu.Menu>
                }
                {!loggedIn &&
                <Menu.Item position='right' active color={activeColor} onClick={() => {this.navigate('/login')}}>Log In</Menu.Item>
                }
    	    </Menu>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        applicationName: state.applicationName,
        loggedIn: state.user && state.apiToken
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logoutUser: logoutUser
    }, dispatch);
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation));
