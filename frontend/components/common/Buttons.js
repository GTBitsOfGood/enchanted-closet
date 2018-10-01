import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon } from 'semantic-ui-react'

// Cosmetic Button File
export const CreateNewEventButton = () => (
  <Button
    animated="fade"
    color="purple"
    as={Link}
    to="/events/create"
  >
    <Button.Content visible>Create New Event</Button.Content>
    <Button.Content hidden>
      <Icon name='add to calendar' />
    </Button.Content>
  </Button>
)

export const DeleteButton = ({ onClick }) => (
  <Button onClick={onClick} animated="vertical" color="red">
    <Button.Content visible>Delete</Button.Content>
    <Button.Content hidden>
      <Icon name='trash' />
    </Button.Content>
  </Button>
)

export const DownloadAttendanceButton = ({ id }) => (
  <Button
    primary
    onClick={() => window.open(`/api/events/${id}/report`, `_blank`)}
    animated="vertical"
    color="blue"
  >
    <Button.Content visible>
      Download Attendance Record
    </Button.Content>
    <Button.Content hidden>
      <Icon name="download" />
    </Button.Content>
  </Button>
)

export const EditButton = ({ id }) => (
  <Button
    secondary
    animated="vertical"
    as={Link}
    to={`/events/${id}/edit`}
  >
    <Button.Content visible>Edit</Button.Content>
    <Button.Content hidden>
      <Icon name='pencil' />
    </Button.Content>
  </Button>
)

export const MarkAttendanceButton = ({ id }) => (
  <Button
    as={Link}
    animated="vertical"
    color="purple"
    to={`/events/${id}/attendance`}
  >
    <Button.Content visible>
      Mark Attendance
    </Button.Content>
    <Button.Content hidden>
      <Icon name="browser" />
    </Button.Content>
  </Button>
)

export const ViewPastEventsButton = ({ onClick }) => (
  <Button
    animated
    basic
    color="purple"
    onClick={onClick}
  >
    <Button.Content visible>View Past Events</Button.Content>
    <Button.Content hidden>
      <Icon name='left arrow' />
    </Button.Content>
  </Button>
)

export const ViewFutureEventsButton = ({ onClick }) => (
  <Button
    animated
    basic
    color="purple"
    onClick={onClick}
  >
    <Button.Content visible>View Future Events</Button.Content>
    <Button.Content hidden>
      <Icon name='right arrow' />
    </Button.Content>
  </Button>

)
