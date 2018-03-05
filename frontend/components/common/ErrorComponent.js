import React from 'react';
import { Container, Card } from 'semantic-ui-react';

const ErrorComponent = ( props ) => {
  const { message: errorMessage, redir, redirMsg, errMsg } = props
  return (
    <Container style={{position: 'relative', top: 100}}>
      <Card fluid color='red'>
        <Card.Content>
	  <h2>{errMsg ? errMsg : '500 - Error'}</h2>
	</Card.Content>
        <Card.Content>
	  <a href={redir}>
	    {redirMsg}
	  </a>
	</Card.Content>
        { errorMessage &&
          <Card.Content> {errorMessage} </Card.Content> }
      </Card>
    </Container>
  );
}

export default ErrorComponent;
