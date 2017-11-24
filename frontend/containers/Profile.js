import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Card } from 'semantic-ui-react';

import PageTitle from '../components/PageTitle';
import LoadingIcon from '../components/LoadingIcon';

import {CustomForm} from '../components/CustomForm';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
	const { dispatch } = this.props;
	//dispatch(fetchProfile()); gets data into store
    }

    componentWillReceiveProps(nextProps) {
	const { newValues } = nextProps; //has key (LABEL) val (VALUE) for each entry
	this.setState({ profileValues: newValues })
    }
    
    render() {
	return (
	    <Container>
		<PageTitle title="Profile" />	
		<Card fluid>
		    <Card.Content>
			{CustomForm(FormData, clickHandler)}
		    </Card.Content>
		</Card>
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
