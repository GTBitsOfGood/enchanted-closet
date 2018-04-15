import React from 'react';
import { Link } from 'react-router-dom';
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

// TODO - remove history
const editButton = ({history, route}) => (
  <Button
    secondary
    animated="vertical"
    as={Link}
    to={`/${route}`}
  >
    <Button.Content visible>Edit</Button.Content>
    <Button.Content hidden>
      <Icon name='pencil' />
    </Button.Content>
  </Button>
);

const markAttendanceButton = ({id}) => (
  <Button
    as={Link}
    to={`/events/${id}/attendance`}
  >
    Mark Attendance
  </Button>
);

const eventImageButton = ({id}) => (
  <Button
    as={Link}
    to={`/events/${id}/upload`}
  >
    Change Event Image
  </Button>
);

module.exports.DownloadAttendanceButton = downloadAttendanceButton;
module.exports.EditButton = editButton;
module.exports.MarkAttendanceButton = markAttendanceButton;
