import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { upsertEvent } from '../../actions';

import { Container, Segment, Form, Message } from 'semantic-ui-react';
import { Event, LoadingIcon, PageTitle } from '../../components/';


class AdminEventsNew extends Component {
  constructor(props) {
    super(props);
    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') this.props.history.goBack();
    this.state = {
      name: '',
      description: '',
      location: '',
      datetime: moment(),
      speakers: '',
      loading: this.props.loading,
      error: this.props.error
    };

    this.upsertEvent = this.upsertEvent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this);
  }

  componentWillMount() {
    if (this.props.event) {
      const {event} = this.props;
      this.setState({
	_id: event._id,
	name: event.name,
	description: event.description,
	location: event.location,
	speakers: event.speakers.join(', '),
	datetime: moment(new Date(event.datetime))
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { loading, error, newEvent} = nextProps;
    this.setState({ loading, error, newEvent });
  }

  upsertEvent() {
    const { processEvent } = this.props;
    const {_id, name, description, location, speakers, datetime} = this.state;
    this.setState({loading: true});
    processEvent({_id, name, description, location, speakers, datetime});
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
	  <PageTitle title={this.state._id ? `Update Event` : `New Event`} />
	  <div style={{paddingTop:50}}>
	    <Segment>
	      <Form error={error !== undefined || error !== null} loading={loading} onSubmit={this.upsertEvent}>
		{error &&
		 <Message
		 error
		 header='Unable to create event'
		 content={error}
		 />
		}
		<Form.Input required label='Event Name' value={this.state.name} name='name' placeholder='Event Name' onChange={this.handleInputChange} />
		<Form.TextArea required label='Description' rows={12} value={this.state.description} name='description' placeholder='Tell us more about this event...' onChange={this.handleInputChange} />
		<Form.Input required label='Event Address' value={this.state.location} name='location' placeholder='123 Main Street, Atlanta GA 30318' onChange={this.handleInputChange} />
		<Form.Input required label='Speakers' value={this.state.speakers} name='speakers' placeholder='John Smith, Jessica Hornbuckle' onChange={this.handleInputChange} />
		<p>* Enter a comma-separated list of names for the speakers of this event</p>
		<Form.Field
		label='Starting date & time'
		control={DatePicker}
		name='datetime'
		selected={this.state.datetime}
		onChange={this.handleDatetimeChange}
		showTimeSelect
		timeFormat="HH:mm"
		timeIntervals={15}/>
		<Form.Button>{this.state._id ? 'Update Event' : 'Create Event'}</Form.Button>
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
    user: state.user,
    loading: state.loading || false,
    error: state.error,
    newEvent: state.newEvent
  };
};

const mapDispatchToProps = dispatch => ({
  processEvent(eventData) {
    dispatch(upsertEvent(eventData));
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventsNew));
