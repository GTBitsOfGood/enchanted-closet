import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PageTitle from '../components/PageTitle';
import { Container, Card } from 'semantic-ui-react';


import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const role = this.props.user.role;
    return (
      <Container>
	<PageTitle title="Dashboard" />
	<div>
	  <p> {role} </p>
	</div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  	user: state.user,
  }
};

const mapDispatchToProps = dispatch => {
  return {};
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard));
