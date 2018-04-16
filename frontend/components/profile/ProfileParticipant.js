import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import { ProfileForm } from '../'

const targets = {
  'phone': {
    constraintMsg: "Only numbers, please",
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'grade': {
    isLegal: val => /^$|^[1-9]|1[0-2]|college]$/.test(val)
  },
  'race': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'school': {
    isLegal: val => /^[\w\s]*$/.test(val)
  },
  'leader': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'emergencyContactName': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'emergencyContactPhone': {
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'emergencyContactRelation': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  }
};

// Only for mutable fields
const ProfileParticipant = props => {
  return (
    <Card style={styles.softCard}>
      <Card.Content>
	<Card.Header> Additional Details: </Card.Header>
	<Card.Description>
	  <ProfileForm targets={targets} />
	</Card.Description>
      </Card.Content>
    </Card>
  )
}

const styles = {
  softCard: {
    padding: '1em',
    width: '50%' // Pretty whimsical
  },
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

export default connect(mapStateToProps)(ProfileParticipant);
