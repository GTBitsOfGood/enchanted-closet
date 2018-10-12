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
      datetime: moment(),
      endtime: moment(),
      speakers: '',
      loading: this.props.loading,
      error: this.props.error
    }

    this.upsertEvent = this.upsertEvent.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDatetimeChange = this.handleDatetimeChange.bind(this)
    this.handleEndtimeChange = this.handleEndtimeChange.bind(this)
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
        datetime: moment(new Date(event.datetime)),
        endtime: moment(new Date(event.endtime)),
      })
    }
  }

  componentWillReceiveProps (nextProps) {
    const { loading, error, newEvent } = nextProps
    this.setState({ loading, error, newEvent })
  }

  upsertEvent () {
    const { upsertEvent: upsert } = this.props
    const { _id, name, description, location, speakers, datetime, endtime } = this.state
    this.setState({ loading: true })
    upsert({ _id, name, description, location, speakers, datetime, endtime })
  }

  handleInputChange (e, { name, value }) {
    this.setState({ [name]: value })
  };

  handleDatetimeChange (updated) {
    this.setState({ 'datetime': updated })
  };

  handleEndtimeChange(updated) {
      this.setState({ 'endtime': updated })
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
                    name='datetime'
                    selected={this.state.datetime}
                    onChange={this.handleDatetimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}/>
                  <Form.Field
                    label='Ending date & time'
                    control={DatePicker}
                    name='endtime'
                    selected={this.state.endtime}
                    onChange={this.handleEndtimeChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15} />
                </Form.Group>
                <Form.Button>
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
