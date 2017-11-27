import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import { Container, Card, Grid, Loader } from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';

class PageTitle extends Component {
	constructor(props) {
		super(props);
	}

    render() {
    	const { title, link, linkTitle, showLoadingIcon, loading } = this.props;
    	return (
    		<Container>
    			<Card fluid>
    				<Card.Content>
    					<Grid>
    						<Grid.Row columns={link && linkTitle ? 2 : 1}>
    							<Grid.Column>
    								<h2 style={{display:'inline'}}>{title}</h2>
									{showLoadingIcon &&
										<Loader active={loading} inline size='small' style={{marginLeft: '20px', marginTop: '-5px'}}/>
									}
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

const mapStateToProps = state => {
	return {
		loading: state.loading
	}
}

export default withRouter(connect(mapStateToProps)(PageTitle));
