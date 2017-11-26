import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

const ECEmergencyContactCard = ( props ) => {
	const {user} = props;

	if (!hasECData(user)) {
		return (
			<Segment color='red'>
				<h3>Emergency Contact</h3>
				<p>There is no Emergency Contact data associated with this individual</p>
			</Segment>
		)
	} else {
	    return (
			<Segment></Segment>
	    );
	}
}

const hasECData = (user) => {
	return user.emergencyContactName || user.emergencyContactPhone || user.emergencyContactRelation;
}

export default ECEmergencyContactCard;
