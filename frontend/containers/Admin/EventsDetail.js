import React, { Component } from 'react';

import EventsDetail from '../EventsDetail';

class AdminEventsDetail extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<EventsDetail adminControls={true}/>
		)
	}
}

export default AdminEventsDetail;
