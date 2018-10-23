import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { fetchUsers } from '../../actions/'

import { Container, Loader, Segment, Grid, Table, Icon } from 'semantic-ui-react'
import { Clearfix } from '../../components/'

const roles = ['admin', 'volunteer', 'participant']

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: {
        'admin': null,
        'volunteer': null,
        'participant': null
      }
    }

    this.mapUsersToStateObject = this.mapUsersToStateObject.bind(this)
  }

  mapUsersToStateObject (users) {
    let userMapping = {
      'admin': [],
      'volunteer': [],
      'participant': []
    }
    users.forEach(user => {
      let role = user.role.toLowerCase()
      userMapping[role].push(user)
    })
    this.setState({ users: userMapping })
    //console.log(userMapping['admin'])
    userMapping['admin'].sort(function(a, b){
    if(a.firstName < b.firstName) { return -1; }
    if(a.firstName > b.firstName) { return 1; }
    return 0;
    })
    userMapping['volunteer'].sort(function(a, b){
    if(a.firstName < b.firstName) { return -1; }
    if(a.firstName > b.firstName) { return 1; }
    return 0;
    })
    userMapping['participant'].sort(function(a, b){
    if(a.firstName < b.firstName) { return -1; }
    if(a.firstName > b.firstName) { return 1; }
    return 0;
    })

  }

  componentWillMount () {
    this.props.fetchUsers()
  }

  componentWillReceiveProps (nextProps) {
    const { users } = nextProps
    this.mapUsersToStateObject(users)
  }

  render () {
    const { history } = this.props
    const { users } = this.state
    return (
      <Container>
        {
          roles.map(role => {
            return (
              <Segment key={role}>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <h1>{`${role.charAt(0).toUpperCase()}${role.substr(1)}s`}</h1>
                    </Grid.Column>
                    <Grid.Column textAlign="right">
                      <a href={`/users/create`}>Create New</a>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row style={{ padding: '20px' }}>
                    {users && users[role] !== null
                      ? <Table>
                        <Table.Body>
                          {users[role].length > 0 ? users[role].map(u => {
                            const name = u.firstName && u.lastName ? u.firstName + ' ' + u.lastName : <i>&lt;No Name&gt;</i>
                            return (
                              <Table.Row
                                key={u._id}
                                style={{ cursor: 'pointer' }}
                                onClick={() => history.push(`/users/${u._id}`)}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{u.email || (<i>&lt;No Email&gt;</i>)}</Table.Cell>
                                <Table.Cell style={{ textAlign: 'right' }}>View <Icon name='right chevron' /></Table.Cell>
                              </Table.Row>
                            )
                          })
                            : (<Table.Row>
                              <Table.Cell>{(<p>There are no users for this role</p>)}</Table.Cell>
                            </Table.Row>)}
                        </Table.Body>
                      </Table>
                      : <Clearfix style={{ padding: '20px' }}>
                        <Loader active/>
                      </Clearfix>
                    }
                  </Grid.Row>
                </Grid>
              </Segment>
            )
          })
        }
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchUsers: fetchUsers
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users))
