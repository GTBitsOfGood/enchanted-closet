import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

import SelectField from 'frontend/components/form/fields/SelectField'
import TextField from 'frontend/components/form/fields/TextField'

const equal = require('fast-deep-equal')

class UniversalForm extends React.Component {
  constructor (props) {
    super(props)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange (fieldName, newValue) {
    this.props.onChange({ ...this.props.value, [fieldName]: newValue })
  }

  render () {
    let modValue = { ...this.props.value }
    this.props.template.forEach(field => {
      if (modValue[field.name] == null) {
        modValue[field.name] = ''
      }
    })
    if (!equal(this.props.value, modValue)) {
      setTimeout(() => { this.props.onChange(modValue) }, 0)
    }
    const formElements = this.props.template.map(field => {
      switch (field.type) {
        case 'text':
          return (<TextField {...field} key={field.name} value={ modValue[field.name] } onChange={(val) => this.onFieldChange(field.name, val)} />)
        case 'select':
          return (<SelectField {...field} key={field.name} value={ modValue[field.name]} onChange={(val) => this.onFieldChange(field.name, val)} />)
        default:
          return <div>Unsupported form field type: {field.type}</div>
      }
    })
    return (<Form>{formElements}</Form>)
  }
}

UniversalForm.propTypes = {
  template: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

UniversalForm.defaultProps = {
  onChange: () => {},
  disabled: false
}

export default UniversalForm
