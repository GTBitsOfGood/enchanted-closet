import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

// Cosmetic Button File
export const DeleteButton = ({onClick}) => (
  <Button onClick={onClick} animated="vertical" color="red">
    <Button.Content visible>Delete</Button.Content>
    <Button.Content hidden>
      <Icon name='trash' />
    </Button.Content>
  </Button>
);

export const DownloadAttendanceButton = ({id}) => (
  <Button
    primary
    onClick={() => window.open(`/api/events/${id}/report`, `_blank`)}
  >
    Download Attendance Record
  </Button>
);

export const EditButton = ({id}) => (
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
);

export const MarkAttendanceButton = ({id}) => (
  <Button
    as={Link}
    to={`/events/${id}/attendance`}
  >
    Mark Attendance
  </Button>
);

export const EventImageButton = ({id}) => (
  <Button
    as={Link}
    to={`/events/${id}/upload`}
  >
    Change Event Image
  </Button>
);

