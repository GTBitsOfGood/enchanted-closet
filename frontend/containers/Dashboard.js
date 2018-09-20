import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { refreshUser } from '../actions/index.js';
import { loadAuthState } from '../store/localStorage.js';

import { PageTitle,
   AdminDashboard,
   BaseDashboard
} from '../components/'
import { Container, Card } from 'semantic-ui-react'


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.refreshUser(this.props.user);
  }
  
  render() {
    const { role } = this.props.user;
    const dashBlock = (role => {
      switch (role) {
  case 'Admin':
    return <AdminDashboard />
    break
  case 'Participant':
  case 'Volunteer':
    return <BaseDashboard />
    break
      }
      return null
    })(role)

    return (
      <Container>
  <PageTitle title={`${role} Dashboard`} />
  { dashBlock }
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    refreshUser: refreshUser
  }, dispatch);
};

export default withRouter(connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard));
