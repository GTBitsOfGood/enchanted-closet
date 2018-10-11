import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import Radium from 'radium'

import { logoutUser } from '../actions/index'

import { Menu, Dropdown } from 'semantic-ui-react'
import { COLORS } from '../constants'

class Navigation extends Component {
  constructor (props) {
    super(props)
    this.navigate = this.navigate.bind(this)
  }

  navigate (route) {
    this.props.history.push(route)
  }

  render () {
    const navFactory = route => () => {
      this.navigate(route)
    }

    const { applicationName, user } = this.props

    const userLinks = [
      ['Dashboard', '/dashboard'],
      ['Profile', '/profile'],
      ['Browse Events', '/events'],
      ['Logout', '/logout']
    ]

    const userBlock = (
      <Menu.Menu position='right'>
        <Dropdown item icon='bars' style={styles.button}>
          <Dropdown.Menu>
            {userLinks.map(pair => (
              <Dropdown.Item
                style={styles.button}
                onClick={navFactory(`${pair[1]}`)}
                key={`${pair[1]}NavLink`}
              >
                {pair[0]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    )

    return (
      <Menu
        style={styles.base}
        inverted
        size='huge'
      >
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
    )
  }
}

const styles = {
  base: {
    background: COLORS.BRAND,
    borderRadius: 0
  },
  button: {
    background: COLORS.BRAND,
    ':hover': {
      background: COLORS.HOVER
    },
    ':active': {
      background: COLORS.HOVER
    }
  }
}

const mapStateToProps = state => {
  return {
    applicationName: state.applicationName,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    logoutUser: logoutUser
  }, dispatch)
}

Navigation.propTypes = {
  applicationName: PropTypes.string,
  history: PropTypes.object,
  location: PropTypes.object,
  logoutUser: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Radium(Navigation)))
