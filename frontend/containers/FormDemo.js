import React from 'react'

import UniversalForm from 'frontend/components/form/UniversalForm'

const testForm = [
  {
    name: 'test',
    type: 'text',
    required: false
  }
]

class FormDemo extends React.Component {
  render () {
    return (
      <div>
        <UniversalForm/>
      </div>
    )
  }
}

export default FormDemo
