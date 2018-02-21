import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card } from 'semantic-ui-react';

import { loadDashboardCards } from '../../actions/';

const DEFAULT_CARDS = [
  {
    content: null,
    title: 'Users',
    url: '/admin/users' // TODO: investigate how to use absolute paths (semantic)
  },
  {
    content: null,
    title: 'Admins',
    url: '/admin/users'
  },
  {
    content: null,
    title: 'Events',
    url: '/admin/events'
  }
];

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { loadDashboardCards } = this.props;
    loadDashboardCards();
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
	    window.open(`/api/report/year`, '_blank')}
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
      </Container>
    );
  }
}

const styles = {
  cardWrap: {
    marginTop: '50px'
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.dashboardCards
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadDashboardCards: loadDashboardCards
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
