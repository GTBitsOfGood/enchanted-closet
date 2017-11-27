import React from 'react';

import { Loader, Container, Card } from 'semantic-ui-react';
import Clearfix from './Clearfix';

const DashboardCards = ( props ) => {
	let { cards } = props;
	cards = cards || [];
	if (cards.length === 0) {
		return (
			<Container>
				<Card fluid>
					<Card.Content><h1>Loading...</h1></Card.Content>
				</Card>
			</Container>
		);
	}

	return (
		<Card.Group>
			{cards.map(DashboardCard)}
		</Card.Group>
	);
};

const DashboardCard = ( props ) => {
	let link = `#/${props.url}`;
	return (
		<Card href={link} centered key={`#${props.content}${props.title}`}>
			{props.content !== null ?
				<Card.Content style={{textAlign: 'center'}}><h1>{props.content}</h1></Card.Content>
			:
			<Clearfix style={{padding: '20px'}}>
				<Loader active inline='centered'/>
			</Clearfix>
			}
			<Card.Content style={{textAlign: 'center'}}><h3>{props.title}</h3></Card.Content>
		</Card>
	);
}
export default DashboardCards;
