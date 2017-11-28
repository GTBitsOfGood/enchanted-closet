import React, {Component} from 'react';

import { Segment, Image, Popup, Icon } from 'semantic-ui-react';

const Speakers = (props) => {
	return (
		<Segment>
			<h3>Speakers</h3>
			{props.speakers && props.speakers.length > 0 ?
				props.speakers.map(speaker => (
					<Popup
						key={speaker.name}
						trigger={<Image src={speaker.avatar} avatar />}
						header={speaker.name}
						content={speaker.bio}
					/>
				))
			:
			<p><Icon name='circle exclamation'/> No speakers have been listed yet</p>
			}
		</Segment>
	);
}

export default Speakers;
