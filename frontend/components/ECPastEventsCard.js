import React, { Component } from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';

const ECPastEventsCards = ( props ) => {
	const {user} = props;

	if (hasPastEvents(user)) {
		return (
			<Segment>
				<h3>Demographics</h3>
				<List >
					{demographicsFields.map(d => {
						return (
							<List.Item key={d}>
								<List.Content>
									<b>{`${d.charAt(0).toUpperCase()}${d.substr(1)}`}: </b>{nullCheck(user[d.toLowerCase()])}
								</List.Content>
							</List.Item>
						)
					})}
				</List>
			</Segment>
		)
	} else {
		return (
			<Segment>
				<h3>Past Events</h3>
				<p><Icon name="triangle exclamation"/> This user has not been marked present at any events</p>
			</Segment>
		);
	}
}

const hasPastEvents = user => {
	return user && (user.pastEvents || []).length > 0;
}

export default ECPastEventsCards;
