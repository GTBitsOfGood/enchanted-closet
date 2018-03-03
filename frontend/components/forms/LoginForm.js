import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { capitalize } from 'lodash';
import { Button, Input, Form } from 'semantic-ui-react';
import { performLogin } from '../../actions/';
import { formWrapper } from './';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: {
	email: -1,
	password: -1,
      },
      email: '',
      password: ''
    }
  }

  regLegalTest = (field, val) => {
    switch (field) {
      case "password": // TODO: Outlawed quotes bc it annoys highlight
	return /^[a-zA-Z0-9.!@?#$%&:;()*\+,\/;\-=[\\\]\^_{|}<>~` ]*$/.test(val);
	break
      case "email":
	return /^[\w@.]*$/.test(val)
	break
    }
  }

  regFinalTest = (field, val) => {
    switch (field) {
      case "email":
	return /^(([^<>()\[\]\\.,;:\s@]+(\.[^<>()\[\]\\.,;:\s@]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
	break
      default:
	return this.regLegalTest(field, val) && val.length !== 0
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
	this.updateStatus(field, 0);
      } else {
	this.props.setError(warningMessage);
      }
    }
  }

  updateStatus = (field, val) => {
    this.setState({
      status: { ...this.state.status, [field]: val }
    });
  }

  blurFunctions = {
    'password': e => {
      if (this.regFinalTest('password', e.target.value)) {
	this.props.setValid();
	this.updateStatus('password', 0);
      } else {
	this.props.setError("Illegal password value");
	this.updateStatus('password', 1);
      }
    },
    'email': e => {
      if (this.regFinalTest('email', e.target.value)) {
	this.props.setValid();
	this.updateStatus('email', 0);
      } else {
	this.props.setError();
	this.updateStatus('email', 1);
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
      this.props.setComplete("Logging in...");
      this.props.performLogin(formData);
    } else {
      this.props.setError("The form is completed incorrectly.");
    }
  }
  
  render() {
    const { email, password } = this.state;
    const { setError, setValid, setComplete, setMessage } = this.props;
    return (
      <div>
	<Form>
	  <Form.Input
	    label="Email"
	    required
	    error={this.errorFactory("email")}
	    name="email"
	    type="email"
	    value={email}
	    onChange={this.changeFunctionFactory("email", "Email characters only.")}
	    placeholder='gburdell@gatech.edu'
	    onBlur={this.blurFunctionFactory('email')}
	  />
	  <Form.Input
	    label="Password"
	    required
	    error={this.errorFactory("password")}
	    name="password"
	    type="password"
	    onChange={this.changeFunctionFactory("password", "That character is illegal.")}
	    value={password}
	    required
	    onBlur={this.blurFunctionFactory('password')}
	  />
	  <Button
	    color="violet"
	    onClick={this.onSubmit}
	    content='Login'
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
    performLogin: performLogin
  }, dispatch);
}

export default formWrapper(connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm));
