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
      speakers: '',
      loading: this.props.loading,
      error: this.props.error,
      dateError: false
    }

    this.upsertEvent = this.upsertEvent.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this)
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this)
  }

  componentWillMount () {
    console.log("componentWillMount");
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
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { loading, error, newEvent } = nextProps
    this.setState({ loading, error, newEvent })
  }

  upsertEvent () {
    if (!this.state.dateError) {
      const { upsertEvent: upsert } = this.props
      const { _id, name, description, location, speakers, startTime, endTime } = this.state
      this.setState({ loading: true })
      upsert({ _id, name, description, location, speakers, startTime, endTime })
    }
  }

  handleInputChange (e, { name, value }) {
    this.setState({ [name]: value })
  };

  handleStartTimeChange (updated) {
    this.setState({ 'startTime': updated })
    this.setState({ 'dateError': this.state.endTime.isBefore(updated) })

  }

  handleEndTimeChange(updated) {
      this.setState({ 'endTime': updated })
      this.setState({ 'dateError': this.state.startTime.isAfter(updated) })
  };

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
