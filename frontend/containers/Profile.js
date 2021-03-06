import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { clearErrors, fetchUserById } from '../actions'

import { Button, Card, Container, Form, Header, Message, Segment } from 'semantic-ui-react'
import { PageTitle, ProfileParticipant, ProfileVolunteer, ProfileBase } from '../components'
import ProfileAdmin from '../components/profile/ProfileAdmin';

class Profile extends Component {
  constructor (props) {
    super(props)
    const { clearErrors, fetchUserById, user } = this.props
    clearErrors()
    fetchUserById(user._id)
  }

  render () {
    const { error, user } = this.props

    const profileBody = (() => {
      switch (user.role) {
        case 'Admin':
          return <ProfileAdmin user={user} />
        case 'Volunteer':
          return <ProfileVolunteer user={user} />
        case 'Participant':
          return <ProfileParticipant user={user} />
      }
    })()

    return (
      <Container>
        <PageTitle title="Profile" />
        <Segment style={styles.wrap}>
          <Container>
            <Card.Group centered stackable>
              <ProfileBase user={user}/>
              {profileBody}
            </Card.Group>
          </Container>
        </Segment>
      </Container>
    )
  }
}

const styles = {
  wrap: { // this doesn't work :(
    paddingTop: '1em'
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    clearErrors,
    fetchUserById
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
