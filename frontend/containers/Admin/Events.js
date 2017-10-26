import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card } from 'semantic-ui-react';

import PageTitle from '../../components/PageTitle';

class AdminEvents extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container>
				<PageTitle title="Events" />
				<div style={{paddingTop:50}}>
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
)(AdminEvents);