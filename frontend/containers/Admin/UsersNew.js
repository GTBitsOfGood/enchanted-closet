import React,{ Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Segment, Form, Button, Dropdown, Icon, Message } from 'semantic-ui-react';

import {upsertUser} from '../../actions/';

import ECRole from '../../components/ECRole';

import CustomForm from '../../components/CustomForm';

import {withRouter, Redirect} from 'react-router-dom';

class UsersNew extends Component {

	constructor(props) {
		super(props);
		this.state = {
			error: this.props.error,
			loading: this.props.loading,
			newUser: this.props.newUser
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.processData = this.processData.bind(this);
	}

	handleInputChange(e, {name, value}) {
		this.setState({ [name]: value });
	}

	componentWillReceiveProps(nextProps) {
		const { loading, error, newUser} = nextProps;
		this.setState({ loading, error, newUser });
		console.log(this.state)
	}

	processData() {
		const {_id, name, password, email, role} = this.state;
		const {upsertUser} = this.props;
		upsertUser({_id, name, password, email, role});
	}

    render() {
		const {loading, error, newUser} = this.state;
		if (newUser) {
			return <Redirect to={`/admin/users/${newUser._id}`}/>
		} else {
	        return (
				<Container>
					<Segment>
						<Form error={error !== undefined && error !== null} loading={loading} onSubmit={this.processData}>
							{error &&
								<Message
									error
									header='Unable to create user'
									content={error}
								/>
							}
							<Form.Input required label='Name' type='text' name='name' placeholder='John Smith' onChange={this.handleInputChange}/>
							<Form.Input required label='Email Address' type='email' name='email' placeholder='john.smith@gmail.com' onChange={this.handleInputChange}/>
							<Form.Input required label='Password' type='password' name='password' placeholder='•••••••••' onChange={this.handleInputChange}/>
							<ECRole required onChange={this.handleInputChange}/>
							{this.state.role !== 'admin' &&
								<p>Not Admin</p>
							}
							<Button primary><Icon name='add user'/>Create User</Button>
						</Form>
					</Segment>
				</Container>
	        );
		}
    }
}

const mapStateToProps = state => {
	return {
		error: state.error,
		newUser: state.newUser,
		loading: state.loading ? state.loading : false
	};
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		upsertUser: upsertUser
	}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersNew));
