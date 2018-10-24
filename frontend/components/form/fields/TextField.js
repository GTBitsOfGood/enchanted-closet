import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

class TextField extends React.PureComponent {
  render () {
    const label = this.props.label ? this.props.label : this.props.name
    return (
      <Form.Field>
        <label>{label}</label>
        <input required={this.props.required} placeholder={this.props.placeholder} value={ this.props.value }
          onChange={(val) => { this.props.onChange(val.target.value) }} />
      </Form.Field>
    )
  }
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  validation: PropTypes.string
}

export default TextField
