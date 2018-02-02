import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {fetchUsers} from '../../actions/';

import Clearfix from '../../components/Clearfix'
import { Container, Loader, Segment, Grid, Table, Icon } from 'semantic-ui-react';

import {withRouter} from 'react-router-dom';

const roles = ['admin', 'volunteer', 'participant'];

class Users extends Component {
  constructor(props) {
    super(props);
    if (this.props.user.role !== 'Volunteer' && this.props.user.role !== 'Admin') this.props.history.goBack();
    this.state = {
      users: {
	'admin': null,
	'volunteer': null,
	'participant': null
      }
    };

    this.mapUsersToStateObject = this.mapUsersToStateObject.bind(this);
  }

  mapUsersToStateObject(users) {
    let userMapping = {
      'admin': [],
      'volunteer': [],
      'participant': []
    };
    users.forEach(user => {
      let role = user.role.toLowerCase();
      userMapping[role].push(user)
    });
    this.setState({users: userMapping});
  }

  componentDidMount() {
    const {fetchUsers, users} = this.props;
    fetchUsers();
  }

  componentWillReceiveProps(nextProps) {
    const {users} = nextProps;
    this.mapUsersToStateObject(users);
  }

  render() {
    const { history } = this.props;
    const { users } = this.state;
    return (
      <Container>
	{
	  roles.map(role => {
	    return (
	      <Segment key={role}>
		<Grid>
		  <Grid.Row columns={2}>
		    <Grid.Column>
		      <h1>{`${role.charAt(0).toUpperCase()}${role.substr(1)}s`}</h1>
		    </Grid.Column>
		    <Grid.Column textAlign="right">
		      <a href={`/admin/users/create`}>Create New</a>
		    </Grid.Column>
		  </Grid.Row>
		  <Grid.Row style={{padding: '20px'}}>
		    {users && users[role] !== null ?
		     <Table>
		       <Table.Body>
			 {users[role].length > 0 ? users[role].map(u => {
			    return (
			      <Table.Row key={u._id} style={{cursor:'pointer'}} onClick={() => history.push(`/admin/users/${u._id}`)}>
				<Table.Cell>{u.name || (<i>&lt;No Name&gt;</i>)}</Table.Cell>
				<Table.Cell>{u.email || (<i>&lt;No Email&gt;</i>)}</Table.Cell>
				<Table.Cell style={{textAlign: 'right'}}>View <Icon name='right chevron' /></Table.Cell>
			      </Table.Row>
			    )
			 })
			  :
			  (<Table.Row>
			    <Table.Cell>{(<p>There are no users for this role</p>)}</Table.Cell>
			  </Table.Row>)}
		       </Table.Body>
		     </Table>
		     :
		     <Clearfix style={{padding:'20px'}}>
		       <Loader active/>
		     </Clearfix>
		    }
		  </Grid.Row>
		</Grid>
	      </Segment>
	    )
	  })
	}
      </Container>
    );
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
    fetchUsers: fetchUsers
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
