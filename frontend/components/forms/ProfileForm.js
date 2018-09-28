import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { capitalize } from 'lodash';
import { Button, Divider, Form } from 'semantic-ui-react';
import { fetchUsers, upsertUser } from '../../actions';
import { formWrapper } from './';
import { startCase } from 'lodash';

// ProfileForm that takes soft field props (targets)
class ProfileForm extends Component {

  constructor(props) {
    super(props);
    const { user, targets } = props;
    this.targets = targets;
    let initStatus = {};
    let initData = {};

    Object.keys(this.targets).forEach( tar => {
      initData[tar] = user[tar] ? user[tar] : "";
      initStatus[tar] = this.regFinalTest(tar, user[tar] ? user[tar] : "") ? 0: -1;
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
    if (!val) return false; // no falsey!
    if (this.targets[field]) {
      if ("isFinal" in this.targets[field])
	return this.targets[field]["isFinal"](val);
      return this.targets[field]["isLegal"](val) && val.length !== 0; // Fallback
    }
    return true; // Field not found in targets, no restrictions
  }

  // Filter is what filter to apply to value into state
  changeFunctionFactory = (field, warningMessage, filter) => {
    return e => {
      if (this.regLegalTest(field, e.target.value) || field=='grade') {
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
  handleChange(event) {
    this.setState({dropdown: event.target.value});
  }

  // verify cb
  updateStatus = (field, val, cb) => {
    this.setState({
      status: { ...this.state.status, [field]: val }
    }, () => {if (cb) this.verifyCb();});
  }

  verifyCb = () => {
    if (this.verifyAll()) {
      this.props.setComplete();
    }
  }

  blurFunctions = { // Implement finer control here
  }

  blurFunctionFactory = field => (e) => {
    if (this.regFinalTest(field, e.target.value)|| field=='grade') {
      this.props.setValid();
      this.updateStatus(field, 0, true);
    } else {
      this.props.setError();
      this.updateStatus(field, 1, true);
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
      const changedKeys = Object.keys(this.state.userData).filter(key => this.state.cachedData[key] !== this.state.userData[key]);
      let diffDict= {};
      changedKeys.forEach(key => {
	diffDict[key] = this.state.userData[key];
      });
      if (Object.keys(diffDict).length === 0)
	this.props.setError("No fields have changed!");
      else {
	this.props.upsertUser({ ...diffDict, _id: this.props.user._id });
	// optimistic update
	this.setState({cachedData: this.state.userData});
      }
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
        const options=[
          {value:6 , label:6},
          {value:7 , label:7},
          {value:8 , label:8},
          {value:9 , label:9},
          {value:10 , label:10},
          {value:11 , label:11},
          {value:12 , label:12}
        ];
          if(key=='grade'){
            return(
              <Form.Select
          		  key={`profile${key}`}
          		  //inline transparent
          		  label={tar.label ? tar.label : startCase(key)}
          		  error={this.errorFactory(key)}
          		  name={key}
          	          //type={tar.type ? tar.type : "text"}
                      options={options}
                      value={userData[key]}
          	          onChange={this.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : "Invalid character")}
          	          onBlur={this.blurFunctionFactory(key)}
          		/>

            )
          }else{
            return(
              <Form.Input
          		  key={`profile${key}`}
          		  //inline transparent
          		  label={tar.label ? tar.label : startCase(key)}
          		  error={this.errorFactory(key)}
          		  name={key}
          	          type={tar.type ? tar.type : "text"}
          	          value={userData[key]}
          	          onChange={this.changeFunctionFactory(key, tar.constraintMsg ? tar.constraintMsg : "Invalid character")}
          	          onBlur={this.blurFunctionFactory(key)}
          		/>
            );
          }

	      })
	  }
	  <Form.Button
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
