import React, { Component } from 'react';
import { Segment, List } from 'semantic-ui-react';

const ECDemographicsCard = ( props ) => {
	const {user} = props;

	const demographicsFields = ['grade', 'birthday', 'age', 'race', 'school', 'leader'];

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
}

const nullCheck = (data) => {
	return data ? data : (<i>&lt;Unknown&gt;</i>);
}

export default ECDemographicsCard;
