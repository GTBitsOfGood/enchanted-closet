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
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate(route) {
    this.props.history.push(route);
  }
  
  render() {
    const navFactory = route => () => this.navigate(route)

    const { applicationName, user, logoutUser } = this.props
    const isAdmin = user ? user.role.toLowerCase() === 'admin' : false
    const adminLinks = [
      ['Dashboard', '/dashboard'],
      ['Users', '/users'],
      ['Events', '/events']
    ]
    const adminBlock = (
      <Dropdown item text='Admin' style={styles.button}>
      <Dropdown.Menu>
      {adminLinks.map(pair => (
	<Dropdown.Item
          style={styles.button}
          onClick={navFactory(`/admin/${pair[1]}`)}
	  key={`${pair[1]}NavLink`}
        >
          {pair[0]}
	</Dropdown.Item>
      ))}
      </Dropdown.Menu>
      </Dropdown>
    )
    const userBlock = (
      <Menu.Menu position='right'>
        <Menu.Item
          style={styles.button}
          onClick={navFactory('/events')}
        >
          Events
        </Menu.Item>
        <Menu.Item
          style={styles.button}
          onClick={navFactory('/profile')}
        >
          My Profile
        </Menu.Item>
        {isAdmin && adminBlock}
        <Menu.Item onClick={logoutUser}> Log out </Menu.Item>
      </Menu.Menu>
    )
    
    return (
      <Menu style={styles.base} inverted stackable size='massive'>
        <Menu.Item header onClick={navFactory('/')}>
          {applicationName}
        </Menu.Item>
        {user ? userBlock : (
	  <Menu.Item
	    position='right'
	    style={styles.button}
	    onClick={navFactory('/login')}
	  >
	    Log In
	  </Menu.Item>
	)}
      </Menu>
    );
  };
};

const styles = {
  base: {
    background: '#3B0086',
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
}

const mapStateToProps = state => {
  return {
    applicationName: state.applicationName,
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(Navigation)))
