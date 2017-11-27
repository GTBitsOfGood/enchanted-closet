import React, {Component} from 'react';

import { Segment, Image, Popup } from 'semantic-ui-react';

const Speakers = (props) => {
	return (
		<Segment>
			<h3>Speakers</h3>
			{props.speakers.map(speaker => (
				<Popup
					key={speaker.name}
					trigger={<Image src={speaker.avatar} avatar />}
					header={speaker.name}
					content={speaker.bio}
				/>
			))}
		</Segment>
	);
}

export default Speakers;