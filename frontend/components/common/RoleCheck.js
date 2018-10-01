import React from 'react'
import { connect } from 'react-redux'

// HoC that renders based on user role: role/roles are accepted
const RoleCheck = ({
  children,
  role = '',
  roles = [],
  userRole
}) => (
  <span>
    {((role && userRole === role.toLowerCase()) ||
      (roles && roles.map(r => r.toLowerCase()).includes(userRole))) &&
     children}
  </span>
)

const mapStateToProps = state => {
  return {
    userRole: state.user ? state.user.role.toLowerCase() : 'loggedout'
  }
}

export default connect(mapStateToProps)(RoleCheck)
