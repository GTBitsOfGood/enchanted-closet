import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { upsertUser } from '../../actions/'

import { Container, Segment, Header, Form, Button, Dropdown, Icon, Message, Transition} from 'semantic-ui-react'
import { Role } from '../../components/'

class UsersNew extends Component {
  constructor (props) {
    super(props)
    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') this.props.history.goBack()
    this.state = {
      error: this.props.error,
      loading: this.props.loading,
      newUser: this.props.newUser
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.processData = this.processData.bind(this)
  }

  handleInputChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  componentWillReceiveProps (nextProps) {
    const { loading, error, newUser } = nextProps
    this.setState({ loading, error, newUser })
  }

  processData () {
    const { _id, name, password, email, role, grade, age, race, school, leader, emergencyContactName, emergencyContactRelation, emergencyContactPhone } = this.state
    const { upsertUser } = this.props
    upsertUser({ _id, name, password, email, role, grade, age, race, school, leader, emergencyContactName, emergencyContactRelation, emergencyContactPhone })
  }

  render () {
    const { loading, error, newUser } = this.state
    if (newUser) {
      return <Redirect to={`/admin/users/${newUser._id}`}/>
    } else {
      return (
        <Container>
          <Segment>
            <Form error={error !== undefined && error !== null} loading={loading} onSubmit={this.processData}>
              {error &&
         <Transition.Group animation={'fade'} duration={500}>
         <Message
           error
           header='Unable to create user'
           content={error}
         />
         </Transition.Group>
              }
              <Form.Input required label='Name' type='text' name='name' placeholder='John Smith' onChange={this.handleInputChange}/>
              <Form.Input required autoComplete="off" label='Email Address' type='email' name='email' placeholder='john.smith@gmail.com' onChange={this.handleInputChange}/>
              <Form.Input required autoComplete="off" label='Password' type='password' name='password' placeholder='•••••••••' onChange={this.handleInputChange}/>
              <Role required onChange={this.handleInputChange}/>
              {this.state.role === 'participant' &&
         <div>
           <Form.Input label='Grade' type='number' value={this.state.grade} name='grade' onChange={this.handleInputChange} placeholder="10"/>
           <Form.Input label='Age' type='number' value={this.state.age} name='age' onChange={this.handleInputChange} placeholder="16"/>
           <Form.Input label='Race/Ethnicity' type='text' value={this.state.race} name='race' onChange={this.handleInputChange} placeholder=""/>
           <Header as='h3'>Affiliations</Header>
           <Form.Input label='School' type='text' value={this.state.school} name='school' onChange={this.handleInputChange} placeholder="Atlanta High School"/>
           <Form.Input label='Leader' type='text' value={this.state.leader} name='leader' onChange={this.handleInputChange} placeholder="Jessica Smith"/>
           <Header as='h3'>Emergency Contact</Header>
           <Form.Input label='Name' type='text' value={this.state.emergencyContactName} name='emergencyContactName' onChange={this.handleInputChange} placeholder="Mary Smith"/>
           <Form.Input label='Phone Number' type='phone' value={this.state.emergencyContactPhone} name='emergencyContactPhone' onChange={this.handleInputChange} placeholder="(404) 002-2999"/>
           <Form.Input label='Relation' type='text' value={this.state.emergencyContactRelation} name='emergencyContactRelation' onChange={this.handleInputChange} placeholder="Mother"/>
         </div>
              }
              <Button primary><Icon name='add user'/>Create User</Button>
            </Form>
          </Segment>
        </Container>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    user: state.user,
    newUser: state.newUser,
    loading: state.loading ? state.loading : false
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    upsertUser: upsertUser
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersNew))
