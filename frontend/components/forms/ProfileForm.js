import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { capitalize } from 'lodash';
import { Button, Input, Form } from 'semantic-ui-react';
import { fetchUsers, upsertUser } from '../../actions';
import { formWrapper } from './';
import { startCase } from 'lodash';
// Test profileForm for participant (Only for mutable parts)
class ProfileForm extends Component {
  
  constructor(props) {
    super(props);
    const { user } = props;
    // given initial data from store
    // init status
    this.targets = {
      'phone': {
	constraintMsg: "Only numbers, please",
	isLegal: val => /^$|^[1-9][0-9]*$/.test(val),
	isFinal: val => /^ *$/.test(val)
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
    
    let initStatus = {};
    let initData = {};
    Object.keys(this.targets).forEach( tar => {
      initData[tar] = user[tar];
      initStatus[tar] = this.regFinalTest(tar, user[tar]) ? 0: -1;
    });
    
    this.state = {
      status: initStatus,	
      userData: initData,
      cachedData: initData
    }
  }

  regLegalTest = (field, val) => {
    if (this.targets[field]) {
      return this.targets[field]["isLegal"](val);
    }
    else
      return true;
  }

  regFinalTest = (field, val) => {
    return true; // TODO
  }

  // filter is what to filter to apply to value into state
  changeFunctionFactory = (field, warningMessage, filter) => {
    return e => {
      if (this.regLegalTest(field, e.target.value)) {
	this.props.setValid();
	this.setState({
	  userData: { ...this.state.userData,
		      [field]: (filter ? filter(e.target.value) : e.target.value)}
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
    const { userData } = this.state;
    if (this.verifyAll()) {
      // diff the objects
      this.props.setComplete("Saving profile");
      this.setState({ loading: true, hasChanged: false });
      const changedKeys = Object.keys(this.state.userData).filter(key => this.state.cachedData[key] !== this.state.userData[key]);
      let diffDict= {};
      changedKeys.forEach(key => {
	diffDict[key] = this.state.userData[key];
      });
      this.props.upsertUser({ ...diffDict, _id: this.props.user._id });

      // don't worry about this for now...
      /*
      const { lastName, firstName, role, email, birthday, ...other } = user
      this.setState({ loading: false });
      if (!user) {
	this.setState({ cachedData: {}, userData: {} })
	console.error("ProfileParticipant null user error")
      } else {
	this.setState({ cachedData: other, userData: other })
      }
      */
    } else {
      this.props.setError("The form is completed incorrectly.");
    }
  }
  
  render() {
    const { userData } = this.state;
    const { setError, setValid, setComplete, setMessage } = this.props;
    return (
      <div>
	<Form>
	  {
	    Object.keys(this.targets).map( key => {
	      const tar = this.targets[key];
	      console.log(tar);
	      return (
		<Input
		  key={`profile${key}`}
		  label={tar.label ? tar.label : startCase(key)}
		  required
		  transparent
		  error={this.errorFactory(key)}
		  name={key}
	          type={tar.type ? tar.type : "text"}
	          value={userData[key]}
	          onChange={this.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : "Invalid character")}
	          onBlur={this.blurFunctionFactory(key)}
		/>
	      )})
	  }
	  <Button
	    color="violet"
	    onClick={this.onSubmit}
	    content='Save Profile'
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
    modalLoaderActive: state.modalLoaderActive,
    user: state.user,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    upsertUser: upsertUser
  }, dispatch)
}

export default formWrapper(connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileForm));
