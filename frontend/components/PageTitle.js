import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Card, Grid, Button } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';
import Radium from 'radium';

class PageTitle extends Component {
    constructor(props) {
	super(props);
    }

    render() {
    	var styles = {
	    button: {
		backgroundColor: '#6200B3',
		fontFamily: 'Lato',
		color: 'white',
		':active': {
		    backgroundColor: '#7E2EC0'
		}
	    }
	}
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
	    			     <Button style={styles.button} inverted as='a' href={`#/${link}`}>{linkTitle}</Button>
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

export default withRouter(Radium(PageTitle));
