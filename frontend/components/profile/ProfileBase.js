import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { Button, Card } from 'semantic-ui-react'
import { ProfileImage } from './'

// Universal Profile card - immutable fields and profile picture
const ProfileBase = props => {
  const { firstName, lastName, role, email, birthday } = props.user;
  const name = firstName + " " + lastName;
  return (
    <Card>
      <ProfileImage />
      <Card.Content>
	<Card.Header>{name}</Card.Header>
	<Card.Meta>{role}</Card.Meta>
	<Card.Description>Email: {email}</Card.Description>
	<Card.Description>Birthday: {moment(birthday).format("MM/DD/YYYY")}</Card.Description>
      </Card.Content>
    </Card>
  );
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  
}, dispatch)

export default connect(mapStateToProps)(ProfileBase)
