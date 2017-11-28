import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'semantic-ui-react'

import { logoutUser } from '../actions/index';

import { withRouter } from 'react-router-dom'
import Radium from 'radium';


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.navigate = this.navigate.bind(this);
    }

    navigate(route) {
        this.props.history.push(route);
    }

    render() {
	var styles = {
	    base: {
	      background: '#3B0086',
	      fontFamily: 'Lato',
          borderRadius: 0
	    },
	    button: {
		background: '#6200B3',
		':hover': {
		  background: '#7E2EC0',
		  boxShadow: '0 3px 0 rgba(0,0,0,0.2)'
		},
		':active': {
		  background: '#7E2EC0',
		  boxShadow: '0 3px 0 rgba(0,0,0,0.2)'
		}
	    }
	};
        const { applicationName, loggedIn, logoutUser } = this.props;
        return (
            <Menu style={styles.base} inverted stackable size='massive'>
                <Menu.Item header onClick={() => this.navigate('/')}>{applicationName}</Menu.Item>
                {loggedIn &&
                    <Menu.Menu position='right'>
                        <Menu.Item style={styles.button} onClick={() => this.navigate('/events')}>Events</Menu.Item>
                        <Menu.Item style={styles.button} onClick={() => this.navigate('/profile')}>My Profile</Menu.Item>
                        <Dropdown item text='Admin' style={styles.button} >
                            <Dropdown.Menu>
                                <Dropdown.Item style={styles.button} onClick={() => this.navigate('/admin/dashboard')}>Dashboard</Dropdown.Item>
                                <Dropdown.Item style={styles.button} onClick={() => this.navigate('/admin/users')}>Users</Dropdown.Item>
                                <Dropdown.Item style={styles.button} onClick={() => this.navigate('/admin/events')}>Events</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Menu.Item onClick={logoutUser}>Log out</Menu.Item>
                    </Menu.Menu>
                }
                {!loggedIn &&
                 <Menu.Item position='right' style={styles.button}  onClick={() => {this.navigate('/login')}}>Log In</Menu.Item>
                }
    	    </Menu>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        applicationName: state.applicationName,
        loggedIn: state.user
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
)(Radium(Navigation)));
