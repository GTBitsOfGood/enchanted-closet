import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, Container, Card } from 'semantic-ui-react';

import PageTitle from '../components/PageTitle';
import LoadingIcon from '../components/LoadingIcon';

import {CustomForm, enhance} from '../components/CustomForm';
import ProfileForm from '../static/surveys/ProfileFormJSON.js';

class Profile extends Component {
    constructor(props){
    	super(props);
    }

    render() {
        let formProps = ProfileForm.ProfileForm;
        const {user} = this.props;
        return (
               <Container>
                   <PageTitle title="Profile" />
                   <Card fluid>
                       <Card.Content>
                           {<CustomForm {...formProps} buttonAction={null} submitRoute="profile" displayType="inline" />}
                       </Card.Content>
                   </Card>
               </Container>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile);
