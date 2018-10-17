import PropTypes from 'prop-types'
import React from 'react'

import { Form } from 'semantic-ui-react'

import TextField from 'frontend/components/form/fields/TextField'

class UniversalForm extends React.Component {
  render () {
    const formElements = this.props.template.map(field => {
      switch (field.type) {
        case 'text':
          return (<TextField {...field} key={Math.random()}/>)
        default:
          return <div>Unsupported form type: {field.type}</div>
      }
    })
    return (<Form>{formElements}</Form>)
  }
}

UniversalForm.propTypes = {
  template: PropTypes.array.isRequired
}

export default UniversalForm
