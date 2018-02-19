import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {fetchUsers, clearErrors, upsertUser} from '../actions';

import { Button, Container, Card, Form, Header, Message } from 'semantic-ui-react';
import { CustomForm, PageTitle, LoadingIcon } from '../components';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';
import { ProfileAdmin, ProfileParticipant, ProfileVolunteer } from '../components';


// TODO: end this hardcode...
const fields = ['name', 'role', 'email', 'phone', 'grade', 'age', 'race', 'school', 'leader', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation'];

class Profile extends Component {
  constructor(props){
    super(props);
    const {clearErrors} = this.props;
    clearErrors();

    this.state = {
      userData: null,
      hasChanged: false,
      loading: false
    };
    if (this.props.user) {
      this.state.user = this.populateUserFields(this.props.user);
    }
    this.populateUserFields = this.populateUserFields.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.inputUpdate = this.inputUpdate.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  populateUserFields(userObject) {
    let usr = {
      _id: userObject._id
    };
    fields.forEach(field => {
      usr = Object.assign({}, usr, {[field]: (userObject[field] || '')});
    });
    return usr;
  }

  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    this.setState({loading: false, hasChanged: false});
    if (!user) {
      this.setState({user: null});
    } else {
      this.setState({user: this.populateUserFields(user)});
    }
  }

  loadUsers() {
    this.setState({loading: true});
  }

  inputUpdate(e, data) {
    this.setState({hasChanged: true});
    const override = {};
    override[data.name] = data.value;
    const userUpdate = Object.assign({}, this.state.user, override);
    this.setState({user: userUpdate});
  }

  submitForm() {
    this.setState({loading: true});
    const { upsertUser } = this.props;
    const { userData } = this.state;
    upsertUser(userData);
  }

  render() {
    const { error, user } = this.props;
    
    const { userData , hasChanged, loading } = this.state;
    const profileBody = (() => {
      switch (user.role) {
	case "Admin":
	  return <ProfileAdmin />;
	  break;
	case "Volunteer":
	  return <ProfileVolunteer />;
	  break;
	case "Participant":
	  return <ProfileParticipant />;
	  break;
      }
    })();
    
    if (user) {
      return (
        <Container>
          <PageTitle title="Profile" />
          <Card fluid>
	    {profileBody}
	    {/*
            <Card.Content>
              {error &&
               <Message
                 error
                 header='Oops an error occurred!'
                 content={error}
               />
              }
	      
              <Form onSubmit={this.submitForm}>
                <Header as='h3'>Bio</Header>
                <Form.Input required label='Name' type='text' value={user.name} name='name' onChange={this.inputUpdate} placeholder="George Burdell"/>
                <Form.Input required label='Email' type='email' value={user.email} name='email' onChange={this.inputUpdate} placeholder="gburdell@gatech.edu" />
                <Form.Input required label='Phone Number' type='phone' value={user.phone} name='phone' onChange={this.inputUpdate} placeholder="(516) 123-4321"/>
                {user.role.toLowerCase() !== 'admin' &&
                 <div>
                   <Form.Input required label='Grade' type='number' value={user.grade} name='grade' onChange={this.inputUpdate} placeholder="10"/>
                   <Form.Input required label='Age' type='number' value={user.age} name='age' onChange={this.inputUpdate} placeholder="16"/>
                   <Form.Input required label='Race/Ethnicity' type='text' value={user.race} name='race' onChange={this.inputUpdate} placeholder=""/>
                   <Header as='h3'>Affiliations</Header>
                   <Form.Input required label='School' type='text' value={user.school} name='school' onChange={this.inputUpdate} placeholder="Atlanta High School"/>
                   <Form.Input required label='Leader' type='text' value={user.leader} name='leader' onChange={this.inputUpdate} placeholder="Jessica Smith"/>
                   <Header as='h3'>Emergency Contact</Header>
                   <Form.Input required label='Name' type='text' value={user.emergencyContactName} name='emergencyContactName' onChange={this.inputUpdate} placeholder="Mary Smith"/>
                   <Form.Input required label='Phone Number' type='phone' value={user.emergencyContactPhone} name='emergencyContactPhone' onChange={this.inputUpdate} placeholder="(404) 002-2999"/>
                   <Form.Input required label='Relation' type='text' value={user.emergencyContactRelation} name='emergencyContactRelation' onChange={this.inputUpdate} placeholder="Teacher"/>
                 </div>
                }
                <Button disabled={!hasChanged} loading={loading} primary type='submit'>Update Profile</Button>
              </Form>
            </Card.Content>
	    */}
          </Card>
        </Container>
      );
    } else {
      return <Redirect to={`/login`}/>;
    }
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
    clearErrors: clearErrors,
    upsertUser: upsertUser
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
