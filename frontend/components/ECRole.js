import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const roles = [
  {
    text: 'Participant',
    value: 'participant'
  }, {
    text: 'Volunteer',
    value: 'volunteer'
  }, {
    text: 'Admin',
    value: 'admin'
  }
]

const ECRole = (props) => {
  const { onChange, onClick, onClose, onFocus } = props
  return (
    <Form.Dropdown
      name='role'
      label='Role'
      style={{ marginBottom: '15px' }}
      placeholder='Select Role'
      fluid
      selection
      options={roles}
      closeOnChange={true}
      onChange={onChange}
      {...props}
    />
  )
}

export default ECRole
