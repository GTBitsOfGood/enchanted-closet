import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsers, promoteUser, deleteUser } from '../../actions/'

import { Segment, Container, Button, Icon, Modal } from 'semantic-ui-react'
import { withRouter, Link} from 'react-router-dom'

import { ContactCard, DemographicsCard, EmergencyContactCard, ErrorComponent, LoadingIcon, PageTitle, PastEventsCard } from '../../components'

class AdminUsersDetail extends Component {
  constructor (props) {
    super(props)
    const { updateUserStore, users, match } = this.props
    this.state = {
      userId: match.params.id,
      loading: false,
      hasPerformedUpdate: false
    }

    if (!users) {
      this.loadUsers()
    } else {
      const usr = users.filter(u => u._id === this.state.userId)
      if (usr.length === 1) {
        this.state = Object.assign({}, this.state, {
          user: usr[0]
        })
      } else {
        this.loadUsers()
      }
    }
    this.loadUsers = this.loadUsers.bind(this)
  }

  loadUsers () {
    const { updateUserStore } = this.props
    this.setState({
      loading: true,
      hasPerformedUpdate: true
    })
    updateUserStore()
  }

  componentWillReceiveProps (nextProps) {
    const { users } = nextProps
    const { userId } = this.state
    const usr = users.filter(u => u._id === userId)
    if (usr.length === 1) {
      this.setState({ user: usr[0], loading: false })
    } else {
      this.setState({ loading: false, hasPerformedUpdate: true })
    }
  }

  handleDelete(userId){
    this.setState({user:null})
    const {deleteUser} = this.props
    deleteUser(userId)
    this.props.history.push('/users')
  }


  render () {
    const { loading, hasPerformedUpdate, userId, user } = this.state
    const { promoteUser} = this.props
    const name = user ? `${user.firstName} ${user.lastName}`
      : 'Name not found'

    return (
      <Container>
        {loading &&
          <div style={{ paddingTop: 50 }}>
            <LoadingIcon active/>
          </div>
        }
        {!loading && hasPerformedUpdate && !user &&
          <ErrorComponent redir='/users/' redirMsg='Return to all users' errMsg='404 - User not Found'/>
        }
        {!loading && user &&
          <div>
            <PageTitle title={user.role + ': ' + name}/>
            <ContactCard user={user}/>
            { user.role === 'Participant' && <DemographicsCard user={user}/>}
            <EmergencyContactCard user={user}/>
            <PastEventsCard user={user}/>
          </div>
        }
        <Button
          as={Link}
          to="/users"
        >
        Back to all users
        </Button>
        {user && user.role === 'Volunteer' &&
        <Button
          onClick={() => promoteUser(userId)}
        >
        Make Admin
        </Button>
        }
        <Modal
          trigger={
            <Button animated="vertical" color="red">
              <Button.Content visible>Delete</Button.Content>
              <Button.Content hidden>
                <Icon name='trash' />
              </Button.Content>
            </Button>
          }
          header='Confirm Delete'
          content='Are you sure you want to delete this user?'
          actions={[
            {key:'cancel', content:'Cancel', negative:true},
            { key: 'done', content: 'Delete', positive: true, onClick:()=>this.handleDelete(userId)}
          ]}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateUserStore: fetchUsers,
    promoteUser,
    deleteUser
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminUsersDetail))
