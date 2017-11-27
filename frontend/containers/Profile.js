import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Card } from 'semantic-ui-react';

import PageTitle from '../components/PageTitle';
import LoadingIcon from '../components/LoadingIcon';

import {CustomForm, enhance} from '../components/CustomForm';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';


const Profile = () => {
    let formProps = ProfileForm.ProfileForm
    let loadRoute = "api/loadProfile"
    let saveRoute = "api/saveProfile"
    return (
	       <Container>
               <PageTitle title="Profile" />
               <Card fluid>
                   <Card.Content>
                       {<CustomForm {...formProps} loadRoute={loadRoute} buttonAction={null} submitRoute="profile" displayType="inline" />}
                   </Card.Content>
               </Card>
           </Container>

    );
}

const mapStateToProps = state => {
    return {
        profileData: state.profileData
    }
}

export default connect(mapStateToProps)(Profile);
