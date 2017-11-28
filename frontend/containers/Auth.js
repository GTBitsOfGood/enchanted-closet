import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withRouter, Redirect} from 'react-router-dom';

class Auth extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props)
		const {loggedIn} = this.props;

		if (loggedIn) {
			return (
				<div>
					{this.props.children}
				</div>
			)
		} else {
			return (
				<Redirect to="/login" />
			)
		}
	}

}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.user
	};
}

export default withRouter(connect(mapStateToProps)(Auth));
