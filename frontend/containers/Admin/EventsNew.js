import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Segment, Form, Message } from 'semantic-ui-react';

import { createEvent } from '../../actions';

import PageTitle from '../../components/PageTitle';
import LoadingIcon from '../../components/LoadingIcon';

import Event from '../../components/Event';

class AdminEventsNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			address: '',
			datetime: '',
			loading: this.props.loading,
			error: this.props.error
		};
		this.processEventCreation = this.processEventCreation.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { loading, error} = nextProps;
		this.setState({ loading, error });
	}

	processEventCreation() {
		const { dispatchEvent } = this.props;
		const {name, description, address} = this.state;
		this.setState({loading: true});
		dispatchEvent({name, description, address});
	}

	handleInputChange(e, {name, value}) {
		this.setState({ [name]: value });
	};

	render() {
		const { loading, error } = this.state;
		return (
			<Container>
				<PageTitle title="New Event" />
				<div style={{paddingTop:50}}>
					<Segment>
						<Form error={error !== undefined || error !== null} loading={loading} onSubmit={this.processEventCreation}>
							{error &&
							<Message
							  error
							  header='Unable to create event'
							  content={error}
							/>
							}
							<Form.Input required label='Event Name' name='name' placeholder='Event Name' onChange={this.handleInputChange} />
							<Form.TextArea required label='Description' name='description' placeholder='Tell us more about this event...' onChange={this.handleInputChange} />
							<Form.Input required label='Event Address' name='address' placeholder='123 Main Street, Atlanta GA 30318' onChange={this.handleInputChange} />
							<Form.Button>Submit</Form.Button>
						</Form>
					</Segment>
				</div>
			</Container>
		);
	}
}

AdminEventsNew.PropTypes = {
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading || false,
		error: state.error
	};
};

const mapDispatchToProps = dispatch => ({
	dispatchEvent(eventData) {
		dispatch(createEvent(eventData));
	}
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminEventsNew);