import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment';
import { Button, Card, Container, Header, Loader, Segment } from 'semantic-ui-react'
import { ProfileForm } from '../'

const targets = {
  'phone': {
    constraintMsg: "Only numbers, please",
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'emergencyContactName': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  },
  'emergencyContactPhone': {
    isLegal: val => /^$|^[1-9][0-9]*$/.test(val)
  },
  'emergencyContactRelation': {
    isLegal: val => /^[a-zA-Z\s]*$/.test(val)
  }
};

class ProfileVolunteer extends Component {
  
  constructor( props ) {
    super(props);
  }

  render() {
    const { lastName, firstName, role, email, birthday } = this.props.user;
    // console.log(birthday);
    // console.log(moment(birthday));
    // console.log(new Date(birthday));
    const name = firstName + " " + lastName;
    const hardBlock = (
      <div>
	<div> { name } </div>
	<div> { email } </div>
	<div> { role } </div>
	<div> { moment(birthday).format("MM/DD/YYYY") } </div>
      </div>
    );

    return (
      <Container style={styles.wrap}>
	<div style={styles.header}>
	  <Header as='h3'>
	    Volunteer Profile
	  </Header>	  
	</div>
	<div style={styles.cardWrap}>
	  <Card style={styles.hardCard}>
	    {hardBlock}
	  </Card>
	  <Card style={styles.softCard}>
	    Additional Details:
	    <ProfileForm
	      targets={targets}
	    />
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

export default connect(mapStateToProps)(ProfileVolunteer)
