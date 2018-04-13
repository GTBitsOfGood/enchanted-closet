import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

// Cosmetic Button File

const deleteButton = () => (
  <Button animated="vertical" color="red">
    <Button.Content visible>Delete</Button.Content>
    <Button.Content hidden>
      <Icon name='trash' />
    </Button.Content>
  </Button>
);

const downloadAttendanceButton = ({id}) => (
  <Button
    primary
    onClick={() => window.open(`/api/events/${id}/report`, '_blank')}
  >
    Download Attendance Record
  </Button>
);

const editButton = ({history, route}) => (
  <Button secondary animated="vertical" onClick={() => history.push(`/${route}`)}>
    <Button.Content visible>Edit</Button.Content>
    <Button.Content hidden>
      <Icon name='pencil' />
    </Button.Content>
  </Button>
);

const markAttendanceButton = ({history}) => (
  <Button onClick={() => history.push(`/events/${event._id}/attendance`)}>
    Mark Attendance
  </Button>
);

module.exports.DownloadAttendanceButton = downloadAttendanceButton;
module.exports.EditButton = editButton;
module.exports.MarkAttendanceButton = markAttendanceButton;
