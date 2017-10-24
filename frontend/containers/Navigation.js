import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react'

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
        const { applicationName, loggedIn, performLogout } = this.props;
        const activeColor = 'violet'
        return (
        	<Menu color='grey' inverted stackable size='large'>
                <Menu.Item header color={activeColor}>{applicationName}</Menu.Item>
                {loggedIn &&
                <Menu.Menu position='right'>
                    <Dropdown item text='Admin'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.navigate('/admin/dashboard')}>Dashboard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
                }
                {loggedIn &&
                <Menu.Item color={activeColor} onClick={performLogout}>Log out</Menu.Item>
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
        loggedIn: true
    };
};

const mapDispatchToProps = (dispatch) => ({
    performLogout() {
        console.log('Will logout');
        return {};
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation));
