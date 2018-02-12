import React, { Component } from 'react';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import EventsDetail from '../EventsDetail';

class AdminEventsDetail extends Component {
  constructor(props) {
    super(props);

    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') this.props.history.goBack();
  }

  render() {
    return (
      <EventsDetail adminControls={true}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(AdminEventsDetail));
