import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { capitalize } from 'lodash';
import { Button, Input, Form } from 'semantic-ui-react';
import { performRegistration } from '../../actions/';
import { formWrapper } from './';

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
	firstName: -1, // -1 for untouched, 0 is no error, 1 is error
	lastName: -1,
	email: -1,
	password: -1,
	confirmPass: -1
      },
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: '',
      role: 'participant'
    }
  }

  formChange = e => this.setState({ [e.target.name]: e.target.value })

  regLegalTest = (field, val) => {
    switch (field) {
      case "firstName":
      case "lastName":
	return /^[a-zA-Z]*$/.test(val)
	break
      case "password":
      case "confirmPass":
	return /^[a-zA-Z0-9.!"@?#$%&:';()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val);
	break
      case "email":
	return /^[\w@.]*$/.test(val)
	break
    }
  }

  regFinalTest = (field, val) => {
    switch (field) {
      case "firstName":
      case "lastName":
	return /^[a-zA-Z]+$/.test(val)
	break
      case "password":
      case "confirmPass":
	return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(val);
	break
      case "email":
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
	break
      default:
	return this.regLegalTest(field, val)
	break
    }
  }

  // filter is what to filter to apply to value into state
  changeFunctionFactory = (field, warningMessage, filter) => {
    return e => {
      if (this.regLegalTest(field, e.target.value)) {
	this.props.setValid();
	this.setState({
	  [field]: filter ? filter(e.target.value) : e.target.value
	});
      } else {
	this.props.setError(warningMessage);
      }
    }
  }

  // Legacy haha
  changeFunctions = {
    "role": tar => {
      return () => {
	this.setState({
	  role: tar
	});
      }
    }
  }

  blurFunctions = {
    'firstName': e => {
      if (this.regFinalTest('firstName', e.target.value)) {
	this.props.setValid();
	this.state.status['firstName'] = 0;
      } else {
	this.props.setError("Field is required.");
	this.state.status['firstName'] = 1;
      }
    },
    'lastName': e => {
      if (this.regFinalTest('lastName', e.target.value)) {
	this.props.setValid();
	this.state.status['lastName'] = 0;
      } else {
	this.props.setError("Field is required.");
	this.state.status['lastName'] = 1;
      }
    },
    'password': e => {
      if (this.regFinalTest('password', e.target.value)) {
	this.props.setValid();
	this.state.status['password'] = 0;
      } else {
	this.props.setError("Minimum length of 7 characters, one number required.");
	this.state.status['password'] = 1;
      }
    },
    'confirmPass': e => {
      if (this.state.password === e.target.value) {
	this.props.setValid();
	this.state.status['confirmPass'] = 0;
      } else {
	this.props.setError("Passwords do not match.");
	this.state.status['confirmPass'] = 1;
      }
    },
    'email': e => {
      if (this.regFinalTest('email', e.target.value)) {
	this.props.setValid();
	this.state.status['email'] = 0;
      } else {
	this.props.setError();
	this.state.status['email'] = 1;
      }
    }
  }

  blurFunctionFactory = field => (e) => {
    this.blurFunctions[field](e);
    if (this.verifyAll()) {
      this.props.setComplete();
    }
  }
  
  verifyAll = () => {    
    const { status } = this.state;
    return Object.keys(status).every(k => status[k] === 0)
  }
  
  errorFactory = field => this.state.status[field] === 1

  onSubmit = () => {
    const { status, confirmPass, ...formData } = this.state;
    if (this.verifyAll()) {
      this.props.setComplete("Registering...");
      this.props.performRegistration(formData);
    } else {
      this.props.setError("The form is completed incorrectly.");
    }
  }
  
  render() {
    const { firstName, lastName, email,
	    password, confirmPass, role } = this.state;
    const { setError, setValid, setComplete, setMessage } = this.props;
    return (
      <div>
	<Form>
	  <Form.Field>
	    <label>First Name</label>
	    <Input
	      error={this.errorFactory("firstName")}
	      name="firstName"
	      value={firstName}
	      onChange={this.changeFunctionFactory("firstName", "Alphabetic characters only.", capitalize)}
	      placeholder="George"
	      onBlur={this.blurFunctionFactory('firstName')}
	    />
	  </Form.Field>
	  <Form.Field>
	    <label>Last Name</label>
	    <Input
	      error={this.errorFactory("lastName")}
	      name="lastName"
	      value={lastName}
	      onChange={this.changeFunctionFactory("lastName", "Alphabetic characters only.", capitalize)}
	      placeholder="Burdell"
	      onBlur={this.blurFunctionFactory('lastName')}
	    />
	  </Form.Field>
	  <Form.Field>
	    <label>Email</label>
	    <Input
	      error={this.errorFactory("email")}
	      name="email"
	      type="email"
	      value={email}
	      onChange={this.changeFunctionFactory("email", "Email characters only.")}
	      placeholder='gburdell@gatech.edu'
	      onBlur={this.blurFunctionFactory('email')}
	    />
	  </Form.Field>
	  <Form.Field>
	    <label>Password</label>
	    <Input
	      error={this.errorFactory("password")}
	      name="password"
	      type="password"
	      onChange={this.changeFunctionFactory("password", "That character is illegal.")}
	      value={password}
	      onBlur={this.blurFunctionFactory('password')}
	    />
	  </Form.Field>
	  <Form.Field>
	    <label>Confirm Password</label>
	    <Input
	      error={this.errorFactory("confirmPass")}
	      name="confirmPass"
	      type="password"
	      onChange={this.changeFunctionFactory("confirmPass", "That character is illegal.")}
	      value={confirmPass}
	      onBlur={this.blurFunctionFactory('confirmPass')}
	    />
	  </Form.Field>
	  <Form.Group inline>
	    <label>I am a: </label>
	    <Form.Radio label='Participant'
			value='participant'
			checked={role === 'participant'}
			onChange={this.changeFunctions['role']('participant')}
	    />
	    <Form.Radio label='Volunteer'
			value='volunteer'
			checked={role === 'volunteer'}
			onChange={this.changeFunctions['role']('volunteer')}
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

export default formWrapper(connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm));
