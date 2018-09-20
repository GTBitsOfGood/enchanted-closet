import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Card, Header } from 'semantic-ui-react'

const ErrorComponent = (props) => {
  const { message: errorMessage, redir, redirMsg, errMsg } = props
  return (
    <Container style={{ position: 'relative', top: 100 }}>
      <Card fluid color='red'>
        <Card.Content>
          <Card.Header>{errMsg || '500 - Error'}</Card.Header>
          { errorMessage &&
            <Card.Content> {errorMessage} </Card.Content> }
          <Link to={redir}>
            {redirMsg}
          </Link>
        </Card.Content>
      </Card>
    </Container>
  )
}

export default ErrorComponent
