import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Container, Divider, Icon } from 'semantic-ui-react'
import { RegisterForm } from '../components/'

const Register = () => (
  <Container>
    <Card fluid color="purple">
      <Card.Content header="Register" />
      <Card.Content>
        <RegisterForm />
      </Card.Content>
    </Card>
    <Divider horizontal> Already Registered? </Divider>
    <Container textAlign="center">
      <Button
        color="violet"
        as={Link}
        to='/login'
        icon labelPosition="left"
      >
  Login
        <Icon name="left arrow" />
      </Button>
    </Container>

  </Container>
)

export default Register
