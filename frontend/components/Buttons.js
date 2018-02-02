import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

const editButton = ({history, route}) => {
  return (
    <Button secondary animated="vertical" onClick={() => history.push(`/${route}`)}>
      <Button.Content visible>Edit</Button.Content>
      <Button.Content hidden>
        <Icon name='pencil' />
      </Button.Content>
    </Button>
  );
}

module.exports.EditButton = editButton;
