import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

// Controlled Wrapper for Semantic Input that reports its status
// check is a 
class SmartInput extends Component {
  constructor(props) {
    super(props);
    const defaultVal = this.props.defaultValue ? this.props.defaultValue : "";
    this.state = {
      "value": defaultVal;
    }
  }

  render() {
    const { checkFunc } = this.props;
    return null; // shoot this is difficult
  }
}

export default SmartInput;
