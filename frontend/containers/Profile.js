import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Icon, Dimmer, Loader, Segment } from 'semantic-ui-react';

import PageTitle from '../components/PageTitle';
import LoadingIcon from '../components/LoadingIcon';

import CustomForm from '../components/CustomForm';

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
	const { dispatch } = this.props;
	//dispatch(fetchProfile());
    }
    
    render() {
	const { profileData } = this.props;
	return (
	    <Container>
		<PageTitle title="Profile" />		
		<div>
		    
		</div>
	    </Container>
	);
    }
}

function mapStateToProps(state){
    const {
	profileData
    } = state;
    return {
	profileData
    }
}

export default connect(mapStateToProps)(Profile)
