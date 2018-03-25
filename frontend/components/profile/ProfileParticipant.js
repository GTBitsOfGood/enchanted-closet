import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { fetchUsers, upsertUser } from '../../actions'
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import MutableEntry from './MutableEntry'

const softFields = [
  {name: 'phone',
   isLegal: val => /^[1-9][0-9]*$/.test(val)},
  {name: 'grade',
   isLegal: val => /^[1-9]|1[0-2]|college]$/.test(val)},
  {name: 'race',
   isLegal: val => /^[a-zA-Z\s]*$/.test(val)},
  {name: 'school',
   isLegal: val => /^\w*$/.test(val)},
  {name: 'leader',
   isLegal: val => /^[a-zA-Z\s]$/.test(val)},
  {name: 'emergencyContactName',
   isLegal: val => /^[a-zA-Z\s]$/.test(val)},
  {name: 'emergencyContactPhone',
   isLegal: val => /^[1-9][0-9]*$/.test(val)},
  {name: 'emergencyContactRelation',
   isLegal: val => /^[a-zA-Z\s]$/.test(val)}]

const legalTest = (() => {
  let legalDict = {};
  softFields.forEach(entry =>
    legalDict[entry.name] = entry.isLegal
  );
  return legalDict;
})();


class ProfileParticipant extends Component {
  
  constructor( props ) {
    super(props);
    const { lastName, firstName, role, email, birthday, ...userData } = props.user;
    let legalData = {};
    Object.keys(userData).forEach( key => {
      legalData[key] = true;
    });
    this.state = {
      loading: false,
      userData, // Dictionary of field (for softFields) names: values
      userLastData: userData, // Cache
      legalData, // names: legal
    }
  }

  onChangeFactory = field => {
    return event => {
      const newVal = event.target.value;
      const newLegal = legalTest[field](newVal);
      this.setState({
	userData: { ...this.state.userData, [field]: newVal },
	legalData: { ...this.state.legalData, [field]: newLegal}
      });
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
    const { lastName, firstName, role, email, birthday } = this.props.user
    const { userData, userLastData } = this.state
    const name = firstName + " " + lastName
    const hardBlock = (
      <div>
	<div> { name } </div>
	<div> { email } </div>
	<div> { role } </div>
	<div> { moment(birthday).format("MM/DD/YYYY") } </div>
      </div>
    )
    
    const hasNotChanged = Object.keys(this.state.userData).filter(key => this.state.userLastData[key] !== this.state.userData[key]).length === 0;
    
    const softBlock = softFields.map(entry => {
      const field = entry.name;
      const value = this.state.userData[field];
      return (
	<MutableEntry
	isLegal={this.state.legalData[field]}
	key={`soft${field}`}
	label={field}
	value={value} 
	initialValue={this.state.userLastData[field]}
	onChange={this.onChangeFactory(field)}
	/>
      )
    });
    
    const allLegal = Object.values(this.state.legalData).reduce((a,b) => a && b);
    return (
      <Container style={styles.wrap}>
	<div style={styles.header}>
	  <Header as='h3'>
	    Participant Profile
	  </Header>
	  <Button
	    disabled={!(!hasNotChanged && allLegal)}
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
