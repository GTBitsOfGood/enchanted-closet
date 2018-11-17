import React from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const roles = [
  {
    text: 'Participant',
    value: 'Participant'
  }, {
    text: 'Volunteer',
    value: 'Volunteer'
  }, {
    text: 'Admin',
    value: 'Admin'
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
