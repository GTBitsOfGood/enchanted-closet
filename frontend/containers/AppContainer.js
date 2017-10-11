import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Title from '../components/Title';
import FileForm from '../components/CustomForm';
import EventEntry from '../components/EventEntry';
import Frame from '../components/Frame';

import { Container, Grid, Reveal } from 'semantic-ui-react';

const AppContainer = () => {
    return (
    <div>
        <Grid.Row>
            <Grid.Column>
                <Container>
                    <Title/>
                    <FileForm type="survey"/>
                    <FileForm type="login" />
                    <EventEntry title="a" date="b" desc="c" address="d" />
                </Container>
            </Grid.Column>
        </Grid.Row>
    </div>
    );
};

AppContainer.propTypes = {
};

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch ) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
