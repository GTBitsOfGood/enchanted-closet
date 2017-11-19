import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

const editButton = () => {
    return (
        <Button secondary animated="vertical">
            <Button.Content visible>Edit</Button.Content>
            <Button.Content hidden>
              <Icon name='pencil' />
            </Button.Content>
        </Button>
        );
}

module.exports.Edit = editButton;