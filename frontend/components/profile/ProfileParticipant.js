import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchUsers, upsertUser } from '../../actions'
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import MutableEntry from './MutableEntry'

const softFields = ['phone', 'grade', 'age', 'race', 'school', 'leader', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation']

class ProfileParticipant extends Component {
  
  constructor( props ) {
    super(props)
    const { lastName, firstName, role, email, ...other } = props.user
    this.state = {
      loading: false,
      userData: other, // Dictionary of field (for softFields) names: values
      changed: {}
    }
  }

  setChangedFactory = field => value => {
    const newChanged = { ...this.state.changed, [field]: value }
    this.setState({ changed: newChanged })
  }

  onChangeFactory = field => {
    const changeFunc = this.setChangedFactory(field)
    return event => {
      const newVal = event.target.innerHTML
      this.setState({ userData: { ...this.state.userData, [field]: newVal } })
      changeFunc(newVal)
    }
  }

  onSave = () => {
    this.setState({loading: true});
    const { upsertUser } = this.props;
    upsertUser({ ...this.state.changed, _id: this.props.user._id });  
  }
  
  componentWillReceiveProps( { user } ) {
    this.setState(
      { loading: false, changed: {} }
    )
    if (!user) {
      this.setState({ userData: {} })
      console.error("ProfileParticipant null user error")
    } else {
      this.setState({ userData: user })
    }
  }
  // each component that corresponds to a profile piece should take the following: - setChanged() callback, value prop, and onChange() prop
  // each component should correspond to a field
  render() {
    const { lastName, firstName, role, email } = this.props.user
    const { userData, changed } = this.state
    const name = firstName + " " + lastName
    const hardBlock = (
      <div>
	<div> { name } </div>
	<div> { email } </div>
	<div> { role } </div>
      </div>
    )

    const softBlock = softFields.map(field => (
      <MutableEntry
	key={`soft${field}`}
	locked={false}
	label={field}
	value={this.state.userData[field]}
	onChange={this.onChangeFactory(field)}
      />))
    
    return (
      <Container style={styles.wrap}>
	<div style={styles.header}>
	  <Header as='h3'>
	    Participant Profile
	  </Header>
	  <Button
	    disabled={ Object.keys(changed).length === 0 }
	    onClick={this.onSave}
	  >
	    Save Profile
	  </Button>
	</div>
	<div style={styles.cardWrap}>
	  <Card style={styles.hardCard}>
	    {hardBlock}
	  </Card>
	  <Card style={styles.softCard}>
	    Additional Details:
	    {softBlock}
	  </Card>
	</div>
      </Container>
    )
  }
}

ProfileParticipant.propTypes = {
}

const styles = {
  cardWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  hardCard: {
    padding: '1em'
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  softCard: {
    padding: '1em'
  },
  wrap: {
    padding: '1em'
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    upsertUser: upsertUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileParticipant)
