import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Card, Icon, Loader } from 'semantic-ui-react';

import { Clearfix } from './'

const DashboardCards = ( props ) => {
  let { cards = [] } = props;
  if (cards.length === 0) {
    return (
      <Container>
	<Card fluid>
	  <Card.Content><h1>Loading...</h1></Card.Content>
	</Card>
      </Container>
    );
  }
  return (
    <Card.Group>
      {cards.map((card) => (<DashboardCard
			      {...card}
			      key={`admin_card_${card.title}`}
      />))}
      <Card
	onClick={() =>
	  window.open(`/api/report/year`, '_blank')}
        centered	
      >
	<Card.Content style={{textAlign: 'center'}}>
	  <h1><Icon name='cloud download'/></h1>
	</Card.Content>
	<Card.Content style={{textAlign: 'center'}}>
	  <h3>'Download Year Attendance'</h3>
	</Card.Content>
      </Card>
    </Card.Group>
  );
};

const DashboardCard = withRouter( props => (
  <Card
    onClick={() => {
	props.history.push({pathname: props.url})
    }}
    target="_blank"
    centered
    key={`#${props.content}${props.title}`}
  >
    {props.content !== null ?
     <Card.Content style={{textAlign: 'center'}}><h1>{props.content}</h1></Card.Content>
     :
     <Clearfix style={{padding: '20px'}}>
       <Loader active inline='centered'/>
     </Clearfix>
    }
    <Card.Content style={{textAlign: 'center'}}><h3>{props.title}</h3></Card.Content>
  </Card>
));


export default DashboardCards
