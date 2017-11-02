import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';

class MissingPage extends Component {
	render() {
		const errorMessage = 'Oops, it looks like you stumbled onto a broken link or a missing page! Please try reloading the page.';
		return (
			<Container style={{position: 'relative', top: 100}}>
				<Card fluid color='red'>
					<Card.Content><h2>404 - Not Found</h2></Card.Content>
					<Card.Content>{errorMessage}</Card.Content>
				</Card>
			</Container>
		);
	}
}

export default MissingPage;