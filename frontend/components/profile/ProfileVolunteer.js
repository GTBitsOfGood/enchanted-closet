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
  'emergencyContactName': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'emergencyContactPhone': {
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'emergencyContactRelation': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'currentPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
  },
  'newPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
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
  }
}

const ProfileVolunteer = props => {
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
    width: '50%'
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

export default connect(mapStateToProps)(ProfileVolunteer)
