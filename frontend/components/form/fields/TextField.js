import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.PureComponent {
  render () {
    const label = this.props.label ? this.props.label : this.props.name
    return (
      <Form.Field>
        <label>{label}</label>
        <input required={this.props.required} placeholder={this.props.placeholder}/>
      </Form.Field>
    )
  }
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  validation: PropTypes.string
}

export default TextField
