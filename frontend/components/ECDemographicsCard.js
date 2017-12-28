import React, { Component } from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';

import moment from 'moment';

const demographicsFields = ['grade', 'birthday', 'age', 'race', 'school', 'leader'];

const ECDemographicsCard = ( props ) => {
	const {user} = props;

	if (hasAtLeastOneDemographic(user)) {
		if (user.birthday) user.birthday = moment(new Date(user.birthday)).format('MMMM Do, YYYY')
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
				<h3>Demographics</h3>
				<p><Icon name="triangle exclamation"/> There is no demographic data associated with this user</p>
			</Segment>
		)
	}
}

const hasAtLeastOneDemographic = user => {
	let hasOne = false;
	demographicsFields.forEach(e => {
		if (user[e]) hasOne = true;
	});
	return hasOne;
}

const nullCheck = (data) => {
	return data ? data : (<i>&lt;Unknown&gt;</i>);
}

export default ECDemographicsCard;
