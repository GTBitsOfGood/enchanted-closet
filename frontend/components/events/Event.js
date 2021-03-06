import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { uniqueId } from 'lodash'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { deleteEvent } from '../../actions'

import { Segment, Icon, Grid, Button, Modal, Header, Popup, Container } from 'semantic-ui-react'
import { Clearfix, EditButton } from '../'
import { COLORS } from '../../constants'
import { sameDay } from '../../helpers/util'

class Event extends Component {
  render () {
    const { data, deleteEvent, history, user } = this.props
    const link = `/events/${data._id}`

    return (
      <div key={uniqueId('event_')} style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div onClick={() => history.push(link)} style={{ cursor: 'pointer' }}>
          <Segment.Group key={uniqueId('event_')}>
            <Segment.Group horizontal>
              <Segment style={style.cardLeft}>
                <Header as='h3' inverted>{data.name}</Header>
                <Popup inverted
                  trigger={(
                    <Container style={style.whiteText}>
                      <Icon name='calendar'/>
                      {moment(new Date(data.startTime)).format('Do MMM YYYY, h:mm a')}
                      &nbsp;&#8209;&nbsp;
                      {sameDay(new Date(data.startTime), new Date(data.endTime))
                        ? moment(new Date(data.endTime)).format('h:mm a')
                        : moment(new Date(data.endTime)).format('Do MMM YYYY, h:mm a')
                      }
                    </Container>
                  )}
                  content="Date"
                />
                {data.registrationStart && data.registrationEnd && // for old events in the DB so they don't break
                  <Popup inverted
                    trigger={(
                      <Container style={style.whiteText}>
                        <Icon name='clock'/>
                        {moment(new Date(data.registrationStart)).format('Do MMM YYYY, h:mm a')}
                        &nbsp;&#8209;&nbsp;
                        {sameDay(new Date(data.registrationStart), new Date(data.registrationEnd))
                          ? moment(new Date(data.registrationEnd)).format('h:mm a')
                          : moment(new Date(data.registrationEnd)).format('Do MMM YYYY, h:mm a')
                        }
                      </Container>
                    )}
                    content="Date"
                  />
                }
                <Popup inverted
                  trigger={(
                    <Container style={style.whiteText}>
                      <Icon name='road' inverted/>
                      {data.location}
                    </Container>
                  )}
                  content="Address"
                />
              </Segment>
              <Segment style={style.cardRight}>
                <Container textAlign="right" style={{ paddingRight: 10, paddingTop: 10 }}>
                  <p>{pruneDescription(data.description)}</p>
                </Container>
              </Segment>
            </Segment.Group>
            {data.showAdminControls &&
             <Segment>
               <Clearfix>
                 <Button.Group floated='right'>
                   <EditButton history={history} route={`admin/events/${data._id}/edit`}/>
                   <Modal
                     trigger={
                       <Button animated="vertical" color="red">
                         <Button.Content visible>Delete</Button.Content>
                         <Button.Content hidden>
                           <Icon name='trash' />
                         </Button.Content>
                       </Button>
                     }
                     header='Confirm Delete'
                     content='Are you sure you want to delete this event?'
                     actions={[
                       'Cancel',
                       { key: 'done', content: 'Delete', negative: true }
                     ]}
                     onActionClick={() => deleteEvent(data._id)}
                   />
                 </Button.Group>
               </Clearfix>
             </Segment>
            }
          </Segment.Group>
        </div>
      </div>
    )
  }
}

const pruneDescription = (description) => {
  if (description) {
    const cutoff = 20 // 20 words;
    const split = description.split(' ')
    if (split.length > cutoff) return `${split.splice(0, 20).join(' ')}...`
    return description
  } else {
    return description
  }
}

const style = {
  cardLeft: {
    backgroundColor: COLORS.BRAND,
    padding: '2em',
    paddingLeft: '2em'
  },
  whiteText: {
    color: COLORS.WHITE
  },
  cardRight: {
    backgroundColor: COLORS.WHITE
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    deleteEvent: deleteEvent
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Event))
