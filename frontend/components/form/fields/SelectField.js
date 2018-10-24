import { Dropdown, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

class SelectField extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onFieldChange = this.onFieldChange.bind(this)
  }

  onFieldChange (event, data) {
    this.props.onChange(data.value)
  }

  render () {
    const label = this.props.label ? this.props.label : this.props.name
    let options = this.props.options
    if (!this.props.options) {
      return (<div>Please fill in all required props</div>)
    } else {
      if (Array.isArray(options) && options.length > 0) {
        const firstItem = options[0]
        if (typeof firstItem === 'string') {
          options = options.map((item) => {
            return { key: item, value: item, text: item }
          })
        }
      } else if (!Array.isArray(options)) {
        options = Object.keys(options).map((key) => {
          return { key: key, value: key, text: options[key] }
        })
      }
    }
    return (
      <Form.Field>
        <label>{label}</label>
        <Dropdown value={this.props.value} onChange={this.onFieldChange} placeholder={this.props.placeholder} fluid selection options={options} />
      </Form.Field>
    )
  }
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])), PropTypes.object]).isRequired,
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
