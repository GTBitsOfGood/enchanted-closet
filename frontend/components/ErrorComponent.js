import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';

const ErrorComponent = ( props ) => {
    const errorMessage = props.message
    const redir = props.redir
    const redirMsg = props.redirMsg
    return (	
	<Container style={{position: 'relative', top: 100}}>
	    <Card fluid color='red'>
		<Card.Content><h2>404 - Not Found</h2></Card.Content>
		<Card.Content><a href={redir}>{redirMsg}</a></Card.Content>
		{ errorMessage && 
		  <Card.Content>{errorMessage}</Card.Content>
		}
	    </Card>
	</Container>	
    );
}

export default ErrorComponent;
