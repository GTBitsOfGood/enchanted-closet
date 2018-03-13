import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { fetchUsers, upsertUser } from '../../actions'
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import MutableEntry from './MutableEntry'

class ProfileAdmin extends Component {
  constructor( props ) {
    super(props)
    const { lastName, firstName, role, email, birthday, ...other } = props.user
    const formatBDay = birthday ? moment(new Date(birthday)).format('MMMM Do YYYY') : null;
    const userData = { ...other, birthday: formatBDay };
  }
  // each component that corresponds to a profile piece should take the following: - setChanged() callback, value prop, and onChange() prop
  // each component should correspond to a field
  render() {
    const { lastName, firstName, role, email } = this.props.user
    const name = firstName + " " + lastName
    const hardBlock = (
      <div>
	<div> { name } </div>
	<div> { email } </div>
	<div> { role } </div>
      </div>
    )
        
    // const allSame = Object.keys();
    return (
      <Container style={styles.wrap}>
	<div style={styles.header}>
	  <Header as='h3'>
	    Admin Profile
	  </Header>
	</div>
	<div style={styles.cardWrap}>
	  <Card style={styles.hardCard}>
	    {hardBlock}
	  </Card>
	</div>
      </Container>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdmin);
