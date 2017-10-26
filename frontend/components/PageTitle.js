import React from 'react';
import PropTypes from 'prop-types';

import { Container, Card } from 'semantic-ui-react';

const PageTitle = ( props ) => {
	const { title } = props;
	return (
		<Container>
			<Card fluid>
				<Card.Content><h2>{title}</h2></Card.Content>
			</Card>
		</Container>
	);
};

export default PageTitle;
