import React, { Component } from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchUsers} from '../../actions/';

import {Segment, Container, Button, Icon, Modal} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import { ContactCard, DemographicsCard, EmergencyContactCard, ErrorComponent, LoadingIcon, PageTitle, PastEventsCard } from '../../components'

class AdminUsersDetail extends Component {
  constructor(props) {
    super(props);
    const {updateUserStore, users, match} = this.props;
    this.state = {
      user_id: match.params.id,
      loading: false,
      hasPerformedUpdate: false
    };

    if (!users) {
      this.loadUsers();
    } else {
      const usr = users.filter(u => u._id === this.state.user_id);
      if (usr.length === 1) {
	this.state = Object.assign({}, this.state, {
	  user: usr[0]
	});
      } else {
	this.loadUsers();
      }
    }
    this.loadUsers = this.loadUsers.bind(this);
  }

  loadUsers() {
    const {updateUserStore} = this.props;
    this.state = Object.assign({}, this.state, {
      loading: true,
      hasPerformedUpdate: true
    });
    updateUserStore();
  }

  componentWillReceiveProps(nextProps) {
    const {users} = nextProps;
    const {user_id} = this.state;
    const usr = users.filter(u => u._id === user_id);
    if (usr.length === 1) {
      this.setState({user: usr[0], loading: false});
    } else {
      this.setState({loading: false, hasPerformedUpdate: true});
    }
  }

  render() {
    const { loading, hasPerformedUpdate, user } = this.state;
    const name = user ? `${user.firstName} ${user.lastName}` :
		 'Name not found';
    return (
      <Container>
	{loading &&
	 <div style={{paddingTop:50}}>
	   <LoadingIcon active/>
	 </div>
	}
	{!loading && hasPerformedUpdate && !user &&
	 <ErrorComponent redir='/users/' redirMsg='Return to all users' errMsg='404 - User not Found'/>
	}
	{!loading && user &&
	 <div>
	   <PageTitle title={name}/>
	   <ContactCard user={user}/>
	   <DemographicsCard user={user}/>
	   <EmergencyContactCard user={user}/>
	   <PastEventsCard user={user}/>
	 </div>
	}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    users: state.users
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    updateUserStore: fetchUsers
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminUsersDetail));
