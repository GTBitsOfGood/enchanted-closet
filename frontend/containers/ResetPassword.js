import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import { Container, Card, Divider, Grid, Icon, Image, Button } from 'semantic-ui-react'
import { ResetPasswordForm } from '../components/'

const ResetPassword = () => (
  <Grid verticalAlign="middle" columns='three' centered>
    <Grid.Row>
      <Grid.Column width={4} only="computer">
        <Image src={require('../../public/images/EC_dress2-01.png')} size='medium' centered />
      </Grid.Column>
      <Grid.Column computer={8} mobile={16}>
        <Container fluid text>
          <Card fluid color='purple' >
            <Card.Content header='Reset Password' />
            <Card.Content>
              <ResetPasswordForm />
            </Card.Content>
          </Card>
          <Divider horizontal> Remember Password? </Divider>
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
          <Divider horizontal> New User? </Divider>
          <Container textAlign="center">
            <Button
              color="violet"
              as={Link}
              to='/register'
              icon labelPosition="left"
            >
              Register a New Account
              <Icon name="left arrow" />
            </Button>
          </Container>
        </Container>
      </Grid.Column>
      <Grid.Column width={4} only="computer">
        <Image src={require('../../public/images/EC_dress4-01.png')} size='medium' centered />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default withRouter(ResetPassword)
