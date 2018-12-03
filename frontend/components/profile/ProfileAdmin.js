import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { ProfileForm } from '../'

const targets = {
  'currentPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
  },
  'newPassword': {
    isLegal: val => /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val),
    isFinal: val => /^(?=.*[A-Za-z.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ])(?=.*\d)[A-Za-z\d.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~`]{7,}$/.test(val)
  }
}

const ProfileAdmin = props => {
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

export default ProfileAdmin
