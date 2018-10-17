import React from 'react'

import UniversalForm from 'frontend/components/form/UniversalForm'

import { Container } from 'semantic-ui-react'

const testForm = [
  {
    name: 'test',
    label: 'Test Label',
    type: 'text',
    required: false
  }
]

class FormDemo extends React.Component {
  render () {
    return (
      <div>
        <Container>
          <UniversalForm template={testForm}/>
        </Container>
      </div>
    )
  }
}

export default FormDemo
