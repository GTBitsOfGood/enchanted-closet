import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

// Display case for buttons for nav/actions
const ButtonGallery = ({role, children}) => (
  <Segment color="purple">
    <Container style={styles.wrap}>
      <Header as="h3">
	{ role === "loggedOut" ? "Action Panel" : `${role} Action Panel` }
      </Header>
      <div style={styles.buttonWrap}>
	{children}
      </div>
    </Container>
  </Segment>
);

const styles = {
  buttonWrap: { // Flex distorts
  },
  wrap: {

  }  
}

const mapStateToProps = state => ({
  role: state.user ? state.user.role : "loggedOut"
})

export default connect(mapStateToProps)(ButtonGallery);
// TODO: Style
