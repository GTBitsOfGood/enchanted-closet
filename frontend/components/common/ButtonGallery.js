import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment } from 'semantic-ui-react';

// TODO : complete - display case for buttons for nav
const ButtonGallery = ({children}) => (
  <Segment> 
    <Container style={styles.wrap} text>
      <Header as="h3">{ header }</Header>
      <p>{ message }</p>
      { link &&  <Link to={ link }>
	{ linkMsg }
      </Link> }
    </Container>
  </Segment>
);

const styles = {
  wrap: {

  }
}

export default ButtonGallery;
// TODO: Style
