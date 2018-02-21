import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Card, Icon, Loader } from 'semantic-ui-react';

import { Clearfix } from '../'

const DashboardCard = withRouter( props => (
  <Card
    onClick={() => {
	props.history.push({pathname: props.url})
    }}
    target="_blank"
    centered
    key={`#${props.content}${props.title}`}
  >
    {props.content ?
     <Card.Content style={{textAlign: 'center'}}>
       <h1>{props.content}</h1>
     </Card.Content>
     :
     <Clearfix style={{padding: '20px'}}>
       <Loader active inline='centered'/>
     </Clearfix>
    }
    <Card.Content style={{textAlign: 'center'}}>
      <h3>{props.title}</h3>
    </Card.Content>
  </Card>
));


export default DashboardCard
