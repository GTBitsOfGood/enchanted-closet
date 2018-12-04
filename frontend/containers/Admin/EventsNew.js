import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import moment from 'moment'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import '../../assets/stylesheets/datepicker.css'

import { upsertEvent } from '../../actions'

import { Container, Segment, Form, Message } from 'semantic-ui-react'
import { Event, LoadingIcon, PageTitle } from '../../components/'

class AdminEventsNew extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      location: '',
      startTime: moment(),
      endTime: moment(),
      registrationStart: null,
      registrationEnd: null,
      speakers: '',
      loading: this.props.loading,
      error: this.props.error,
      dateError: false
    }
  }

  componentWillMount () {
    if (this.props.event) {
      const { event } = this.props
      this.setState({
        _id: event._id,
        name: event.name,
        description: event.description,
        location: event.location,
        speakers: event.speakers.join(', '),
        startTime: moment(new Date(event.startTime)),
        endTime: moment(new Date(event.endTime)),
        registrationStart: moment(new Date(event.registrationStart)),
        registrationEnd: moment(new Date(event.registrationEnd))
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { loading, error, newEvent } = nextProps
    this.setState({ loading, error, newEvent })
  }

  upsertEvent = () => {
    if (!this.state.dateError) {
      const { upsertEvent: upsert } = this.props
      const { _id, name, description, location, speakers, startTime, endTime, registrationStart, registrationEnd } = this.state
      this.setState({ loading: true })
      upsert({ _id, name, description, location, speakers, startTime, endTime, registrationStart, registrationEnd })
    }
  }

  handleInputChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleStartTimeChange = (startTime) => {
    this.setState({ startTime })
    this.setState({ dateError: this.state.endTime.isBefore(startTime) })
  }

  handleEndTimeChange = (endTime) => {
    this.setState({ endTime })
    this.setState({ dateError: this.state.startTime.isAfter(endTime) })
  }

  handleregistrationStartTimeChange = (registrationStart) => {
    this.setState({ registrationStart })
    this.setState({ dateError:
      this.state.registrationEnd.isBefore(registrationStart) ||
      this.state.registrationStart.isAfter(this.state.startTime) })
  }

  handleregistrationEndTimeChange = (registrationEnd) => {
    this.setState({ registrationEnd })
    this.setState({ dateError:
      this.state.registrationStart.isAfter(registrationEnd) ||
      this.state.registrationEnd.isAfter(this.state.startTime) })
  }

  render () {
    const { loading, error, newEvent } = this.state
    if (newEvent) {
      return (
        <Redirect to = {
          `/events/${newEvent._id}`
        }
        />
      )
    } else {
      return (
        <Container>
          <PageTitle title={this.state._id ? `Update Event` : `New Event`} link="/events" linkTitle="Back to All" />
          <div style={{ paddingTop: 50 }}>
            <Segment>
              <Form
                error={error !== undefined || error !== null}
                loading={loading} onSubmit={this.upsertEvent}
              >
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
                <Form.Group widths='equal'>
                  <Form.Field
                    required
                    label='Starting date & time'
                    control={DatePicker}
                    name='startTime'
                    selected={this.state.startTime}
                    onChange={this.handleStartTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    error={this.state.dateError} />
                  <Form.Field
                    required
                    label='Ending date & time'
                    control={DatePicker}
                    name='endTime'
                    selected={this.state.endTime}
                    onChange={this.handleEndTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    error={this.state.dateError}/>
                </Form.Group>
                {this.state.dateError &&
                  <Message>
                    <Message.Header>Date Error</Message.Header>
                    <p>
                      Start date must be before end date!
                    </p>
                  </Message>
                }
                <Form.Group widths='equal'>
                  <Form.Field
                    required
                    label='Registration start date & time'
                    control={DatePicker}
                    name='registrationStart'
                    selected={this.state.registrationStart}
                    onChange={this.handleregistrationStartTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    error={this.state.dateError} />
                  <Form.Field
                    required
                    label='Registration end date & time'
                    control={DatePicker}
                    name='registrationEnd'
                    selected={this.state.registrationEnd}
                    onChange={this.handleregistrationEndTimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    error={this.state.dateError}/>
                </Form.Group>
                {/* Do I need this here or is the one above enough?? */}
                {this.state.dateError &&
                  <Message>
                    <Message.Header>Date Error</Message.Header>
                    <p>
                      Start date must be before end date!
                    </p>
                  </Message>
                }
                <Form.Button disabled={this.state.dateError || !this.state.name || !this.state.location || !this.state.description || !this.state.speakers}>
                  {this.state._id ? 'Update Event' : 'Create Event'}
                </Form.Button>
              </Form>
            </Segment>
          </div>
        </Container>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading || false,
    error: state.error,
    newEvent: state.newEvent
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  upsertEvent
}, dispatch)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventsNew))
