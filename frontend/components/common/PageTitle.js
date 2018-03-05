import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { Container, Card, Grid, Button, Loader } from 'semantic-ui-react';

import { COLORS } from '../../constants'

class PageTitle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, link, linkTitle, showLoadingIcon, loading } = this.props;
    return (
      <Container>
        <Card fluid style={styles.background}>
          <Card.Content>
            <Grid>
              <Grid.Row columns={link && linkTitle ? 2 : 1}>
                <Grid.Column>
                  <h2>{title}</h2>
		  {showLoadingIcon &&
		   <Loader active={loading} inline size='small' style={styles.loader}/>
		  }
                </Grid.Column>
                {link && linkTitle &&
                 <Grid.Column textAlign="right">
                   <Button style={styles.button} as='a' href={`${link}`}>{linkTitle}</Button>
                 </Grid.Column>
                }
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

const styles = {
  background: {
    backgroundColor: COLORS.BRAND,
    color: COLORS.WHITE
  },
  button: {
    backgroundColor: COLORS.BUTTON,
    border: `1px solid ${COLORS.WHITE}`,
    fontFamily: 'Lato',
    color: COLORS.WHITE,
    ':active': {
      backgroundColor: COLORS.HOVER
    }
  },
  loader: {
    marginLeft: '20px',
    marginTop: '-5px'
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}

export default withRouter(Radium(connect(mapStateToProps)(PageTitle)));
