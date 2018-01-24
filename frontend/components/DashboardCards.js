import React from 'react';

import { Loader, Container, Card, Icon } from 'semantic-ui-react';
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

	// Year-long Attendance Card
	cards.push({content: (<Icon name='cloud download'/>), title: 'Download Year Attendance', specific_url: '/api/report/year'});

	return (
		<Card.Group>
			{cards.map(DashboardCard)}
		</Card.Group>
	);
};

const DashboardCard = props => {
	const link = props.specific_url ? `${props.specific_url}` : `#/${props.url}`;
	return (
		<Card href={link} target="_blank" centered key={`#${props.content}${props.title}`}>
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
