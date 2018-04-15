import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card, Icon } from 'semantic-ui-react';

import { loadDashboardCards, fetchUsers, fetchFutureEvents } from '../../actions/';

import DashboardCard from './DashboardCard';
import AdminVolunteerControl from './AdminVolunteerControl';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { loadDashboardCards, fetchUsers, fetchFutureEvents } = this.props;
    loadDashboardCards();
    fetchUsers();
    fetchFutureEvents();
  }

  render() {
    const { cards = [] } = this.props;
    const body = cards.length === 0 ? (
      <Card fluid>
	<Card.Content>
	  <h1>Loading...</h1>
	</Card.Content>
      </Card>
    ) : (
      <Card.Group>
	{ cards.map( card => (
	  <DashboardCard {...card}
			 key={`admin_card_${card.title}`} />)) }
	<Card
	  onClick={() =>
	    window.open(`/api/report/year`, 'year.csv')}
          centered	
	>
	  <Card.Content style={{textAlign: 'center'}}>
	    <h1><Icon name='cloud download'/></h1>
	  </Card.Content>
	  <Card.Content style={{textAlign: 'center'}}>
	    <h3>'Download Year Attendance'</h3>
	  </Card.Content>
	</Card>	
      </Card.Group>
    )

    return (
      <Container>
	<div style={styles.cardWrap}>
	  { body }
	</div>
	<AdminVolunteerControl />
      </Container>
    );
  }
}

const styles = {
  cardWrap: {
    marginTop: '50px'
  }
}

const mapStateToProps = state => ({
    cards: state.dashboardCards
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadDashboardCards,
    fetchFutureEvents,
    fetchUsers
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
