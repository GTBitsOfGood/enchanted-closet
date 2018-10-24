import React from 'react'

import UniversalForm from 'frontend/components/form/UniversalForm'

import { Container } from 'semantic-ui-react'

const testForm = [
  {
    name: 'text_test',
    label: 'Test Text Input',
    type: 'text',
    required: false
  },
  {
    name: 'select_test',
    label: 'Test Select',
    type: 'select',
    options: ['Magic Value1', 'Magic Value 2'],
    placeholder: 'PlaceHolder',
    required: false
  }
]

class FormDemo extends React.Component {

  constructor () {
    super()
    this.state = {
      formOutput: {}
    }
  }

  render () {
    return (
      <div>
        <Container>
          <UniversalForm template={testForm} value={this.state.formOutput}
            onChange={(newVal) => { this.setState({ formOutput: newVal }) }} />
          <div style={{ 'marginTop': '50px', width: '100%' }}>
            <textarea style={{ width: '100%', height: '100px' }} disabled value={JSON.stringify(this.state.formOutput, null, 4)}/>
          </div>
        </Container>
      </div>
    )
  }
}

export default FormDemo
