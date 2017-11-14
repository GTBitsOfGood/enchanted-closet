import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Container, Segment, Form, Message } from 'semantic-ui-react';

import { createEvent } from '../../actions';

import PageTitle from '../../components/PageTitle';
import LoadingIcon from '../../components/LoadingIcon';

import Event from '../../components/Event';

import moment from 'moment';
import DatePicker from 'react-datepicker';

import { Redirect } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

class AdminEventsNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			address: '',
			datetime: moment(),
			loading: this.props.loading,
			error: this.props.error
		};
		this.processEventCreation = this.processEventCreation.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const { loading, error, newEvent} = nextProps;
		this.setState({ loading, error, newEvent });
	}

	processEventCreation() {
		const { dispatchEvent } = this.props;
		const {name, description, address, datetime} = this.state;
		this.setState({loading: true});
		dispatchEvent({name, description, address, datetime});
	}

	handleInputChange(e, {name, value}) {
		this.setState({ [name]: value });
	};

	handleDatetimeChange(updated) {
		this.setState({'datetime': updated});
	};

	render() {
		const { loading, error, newEvent } = this.state;
		if (newEvent) {
			return <Redirect to={`/admin/events/${newEvent._id}`}/>
		} else {
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
								<Form.Field
									label='Starting date & time'
									control={DatePicker}
									name='datetime'
									selected={this.state.datetime}
									onChange={this.handleDatetimeChange}
									showTimeSelect
									timeFormat="HH:mm"
									timeIntervals={15}/>
								<Form.Button>Submit</Form.Button>
							</Form>
						</Segment>
					</div>
				</Container>
			);
		}
	}
}

AdminEventsNew.PropTypes = {
	dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
	return {
		loading: state.loading || false,
		error: state.error,
		newEvent: state.newEvent
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