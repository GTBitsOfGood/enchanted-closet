import React from 'react';

import { Segment, Icon, Card } from 'semantic-ui-react';

import { uniqueId } from 'lodash';

import { Link } from 'react-router-dom';

const Event = ( data ) => {
    const link = `/#/events/${data._id}`
    return (
        <Segment key={uniqueId('event_')}>
	    <h3><a href={link}>{data.name}</a></h3>	    
	    <p>{data.description}</p>
	    <p><Icon name='calendar'/>{data.datetime}</p>
	    <p><Icon name='road'/>{data.location}</p>
        </Segment>
    )
}

export default Event;
