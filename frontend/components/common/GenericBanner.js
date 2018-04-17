import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Divider, Header, Segment } from 'semantic-ui-react';

// A generic banner for displaying a message and optionally providing a redirect
const GenericBanner = ({
  header = "Notice",
  message = "The requested resource is unavailable",
  linkMsg = "Back to a good place",
  link = "/"
}) => (
  <div>
    <Segment> 
      <Container style={styles.wrap} text>
	<Header as="h2">{ header }</Header>
	<p>{ message }</p>
	{ link &&  <Link to={ link }>
	  { linkMsg }
	</Link> }
      </Container>
    </Segment>
    <Divider />
  </div>
);

const styles = {
  wrap: {
    paddingTop: "10px"
  }
}

export default GenericBanner;
