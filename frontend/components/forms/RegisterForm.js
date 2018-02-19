import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'semantic-ui-react';
import { performRegistration } from '../../actions/';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // status: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      userType: 'participant'
    }
  }

  formChange = e => this.setState({ [e.target.name]: e.target.value })
    
  // For radio buttons
  setUserType = tar => {
    return () => {
      this.setState({
	userType: tar
      });
    }
  }
  
  onSubmit = () => {
    const { confirmPass, ...formData } = this.state;
    performRegistration(formData);
  }
  
  render() {
    const { firstName, lastName, email,
	    password, confirmPass, userType } = this.state;
    return (
      <div>
	<Form>
	  <Form.Field>
	    <label>First Name</label>
	    <input
	      name="firstName"
	      value={firstName}
	      onChange={this.formChange}
	      placeholder="George" />
	  </Form.Field>
	  <Form.Field>
	    <label>Last Name</label>
	    <input
	      name="lastName"
	      value={lastName}
	      onChange={this.formChange}
	      placeholder="Burdell" />
	  </Form.Field>
	  <Form.Field>
	    <label>Email</label>
	    <input
	      name="email"
	      type="email"
	      value={email}
	      onChange={this.formChange}
	      placeholder='gburdell@gatech.edu' />
	  </Form.Field>
	  <Form.Field>
	    <label>Password</label>
	    <input
	      name="password"
	      type="password"
	      onChange={this.formChange}
	      value={password}
	    />
	  </Form.Field>
	  <Form.Field>
	    <label>Confirm Password</label>
	    <input
	      name="confirmPass"
	      type="password"
	      onChange={this.formChange}
	      value={confirmPass}
	    />
	  </Form.Field>
	  <Form.Group inline>
	    <label>I am a: </label>
	    <Form.Radio label='Participant'
			value='participant'
			checked={userType === 'participant'}
			onChange={this.setUserType('participant')}
	    />
	    <Form.Radio label='Volunteer'
			value='volunteer'
			checked={userType === 'volunteer'}
			onChange={this.setUserType('volunteer')}
	    />
          </Form.Group>
	  <Button
	    onClick={this.onSubmit}
	    content='Register'
	    type='submit'
	  />
	</Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    modalLoaderActive: state.modalLoaderActive
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    performRegistration: performRegistration
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
