import React from 'react';

import { Segment, Icon } from 'semantic-ui-react';

import { uniqueId } from 'lodash';

const Event = ( data ) => {
    return (
        <Segment key={uniqueId('event_')}>
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <p><Icon name='calendar'/>{data.datetime}</p>
            <p><Icon name='road'/>{data.location}</p>
        </Segment>
    )
}

export default Event;