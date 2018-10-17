import { Dropdown, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

class SelectField extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onFieldChange = this.bind(this.onFieldChange)
  }

  onFieldChange (event, data) {
    this.props.onChange(data.value)
  }

  render () {
    const label = this.props.label ? this.props.label : this.props.name
    return (
      <Form.Field>
        <label>{label}</label>
        <Dropdown value={this.props.value} onChange={this.onFieldChange} placeholder={this.props.placeholder} fluid selection options={this.props.options} />
      </Form.Field>
    )
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  validation: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object])
}

SelectField.defaultProps = {
  onChange: () => {}
}

export default SelectField
