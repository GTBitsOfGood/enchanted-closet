import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';
import EventsDetail from '../EventsDetail';

class AdminEventsDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		<p>Test</p>
		)
	}
}

export default withRouter(AdminEventsDetail);