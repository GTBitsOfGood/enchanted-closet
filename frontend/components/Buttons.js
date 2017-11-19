import React from 'react';

import { Button, Icon } from 'semantic-ui-react';

const editButton = ({history, route, id}) => {
    return (
        <Button secondary animated="vertical" onClick={() => history.push(`/${route}/${id}`)}>
            <Button.Content visible>Edit</Button.Content>
            <Button.Content hidden>
              <Icon name='pencil' />
            </Button.Content>
        </Button>
        );
}

module.exports.Edit = editButton;