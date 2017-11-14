import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Card, Grid } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';

class PageTitle extends Component {
	constructor(props) {
		super(props);
	}

    render() {
    	const { title, link, linkTitle } = this.props;
    	return (
    		<Container>
    			<Card fluid>
    				<Card.Content>
    					<Grid>
    						<Grid.Row columns={link && linkTitle ? 2 : 1}>
    							<Grid.Column>
    								<h2>{title}</h2>
    							</Grid.Column>
    							{link && linkTitle &&
    							<Grid.Column textAlign="right">
	    							<a href={`#/${link}`}>{linkTitle}</a>
    							</Grid.Column>
	    						}
    						</Grid.Row>
    					</Grid>
    				</Card.Content>
    			</Card>
    		</Container>
    	);
    }
}

export default withRouter(PageTitle);
