import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import { ProfileForm } from '../'

const targets = {
  'phone': {
    constraintMsg: 'Only numbers, please',
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'grade': {
    isLegal: val => /^$|^[1-9]|1[0-2]|college]$/.test(val),
    options: [
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' },
      { key: '9', text: '9', value: '9' },
      { key: '10', text: '10', value: '10' },
      { key: '11', text: '11', value: '11' },
      { key: '12', text: '12', value: '12' },
    ]
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
  },
  'tshirt': {
    isLegal: val => /^$|^(Extra\sSmall|Small|Medium|Large|Extra\sLarge|2\sExtra\sLarge|3\sExtra\sLarge)$/.test(val),
    options: [
      { key: 'Extra Small', text: 'Extra Small', value: 'Extra Small' },
      { key: 'Small', text: 'Small', value: 'Small' },
      { key: 'Medium', text: 'Medium', value: 'Medium' },
      { key: 'Large', text: 'Large', value: 'Large' },
      { key: 'Extra Large', text: 'Extra Large', value: 'Extra Large' },
      { key: '2x Extra Large', text: '2x Extra Large', value: '2x Extra Large' },
      { key: '3x Extra Large', text: '3x Extra Large', value: '3x Extra Large' }
    ]
  },
  'currentPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
  },
  'newPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
  }
}

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
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

export default connect(mapStateToProps)(ProfileParticipant)
