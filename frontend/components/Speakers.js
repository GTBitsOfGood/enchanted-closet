import React, {Component} from 'react';

import { Segment, Image, Popup, Icon } from 'semantic-ui-react';

const Speakers = (props) => {
	return (
		<Segment>
			<h3>Speakers</h3>
			{props.presenters && props.presenters.length > 0 ?
				props.presenters.map(speaker => (
					<Popup
						key={speaker.name}
						trigger={speaker.avatar ? (<Image src={speaker.avatar} avatar />) : (<Icon name='question circle outline'/>)}
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
