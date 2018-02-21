import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Card } from 'semantic-ui-react';

import { DashboardCards, PageTitle } from '../../components/'

import { loadDashboardCards } from '../../actions/';

import { withRouter } from 'react-router-dom';

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
    if (this.props.user.role !== 'Volunteer' &&
  this.props.user.role !== 'Admin') {
      this.props.history.goBack();
    }
  }

  componentDidMount() {
    const { loadDashboardCards } = this.props;
    loadDashboardCards();
  }

  render() {
    const { cards } = this.props;
    return (
      <Container>
  <div style={styles.cardWrap}>
    <DashboardCards cards={cards} />
  </div>
      </Container>
    );
  }
}

const styles = {
  cardWrap: {
    paddingTop: '50px'
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cards: state.dashboardCards
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loadDashboardCards: loadDashboardCards
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard));
