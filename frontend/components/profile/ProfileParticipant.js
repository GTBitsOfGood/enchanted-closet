import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { fetchUsers, upsertUser } from '../../actions'
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import MutableEntry from './MutableEntry'

const softFields = ['phone', 'grade', 'birthday', 'age', 'race', 'school', 'leader', 'emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation']

class ProfileParticipant extends Component {
  
  constructor( props ) {
    super(props)
    const { lastName, firstName, role, email, birthday, ...other } = props.user
    const formatBDay = birthday ? moment(new Date(birthday)).format('MMMM Do YYYY') : null;
    const userData = { ...other, birthday: formatBDay };
    this.state = {
      loading: false,
      userData, // Dictionary of field (for softFields) names: values
      userLastData: userData, // Cache
    }
  }

  onChangeFactory = field => {
    return event => {
      const newVal = event.target.value
      this.setState({ userData: { ...this.state.userData, [field]: newVal } })
    }
  }

  onSave = () => {
    // diff the two things
    this.setState({ loading: true, hasChanged: false });    
    const changedKeys = Object.keys(this.state.userData).filter(key => this.state.userLastData[key] !== this.state.userData[key]);
    let diffDict= {};
    changedKeys.forEach(key => {
      diffDict[key] = this.state.userData[key];
    });
    const { upsertUser } = this.props;
    upsertUser({ ...diffDict, _id: this.props.user._id });  
  }
  
  componentWillReceiveProps( { user } ) {
    const { lastName, firstName, role, email, ...other } = user
    this.setState(
      { loading: false }
    )
    if (!user) {
      this.setState({ userLastData: {}, userData: {} })
      console.error("ProfileParticipant null user error")
    } else {
      this.setState({ userLastData: other, userData: other })
    }
  }
  // each component that corresponds to a profile piece should take the following: - setChanged() callback, value prop, and onChange() prop
  // each component should correspond to a field
  render() {
    const { lastName, firstName, role, email } = this.props.user
    const { userData, userLastData } = this.state
    const name = firstName + " " + lastName
    const hardBlock = (
      <div>
	<div> { name } </div>
	<div> { email } </div>
	<div> { role } </div>
      </div>
    )
    
    const hasChanged = Object.keys(this.state.userData).filter(key => this.state.userLastData[key] !== this.state.userData[key]).length === 0;
    
    const softBlock = softFields.map(field => (
      <MutableEntry
	key={`soft${field}`}
	label={field}
	value={this.state.userData[field]} 
	initialValue={this.state.userLastData[field]}
	onChange={this.onChangeFactory(field)}
      />
    ));

    // const allSame = Object.keys();
    return (
      <Container style={styles.wrap}>
	<div style={styles.header}>
	  <Header as='h3'>
	    Participant Profile
	  </Header>
	  <Button
	    disabled={hasChanged}
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
