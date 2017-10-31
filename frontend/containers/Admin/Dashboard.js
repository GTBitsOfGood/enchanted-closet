import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card } from 'semantic-ui-react';

import PageTitle from '../../components/PageTitle';
import DashboardCards from '../../components/DashboardCards';

class AdminDashboard extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const cards = [
			{
				content: 54,
				title: 'Users',
				url: 'admin/users'
			},
			{
				content: 4,
				title: 'Admins',
				url: 'admin/users'
			},
			{
				content: 20,
				title: 'Events',
				url: 'admin/events'
			}
		];
		return (
			<Container>
				<PageTitle title="Dashboard" />
				<div style={{paddingTop:50}}>
					<DashboardCards cards={cards} />
				</div>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDashboard);