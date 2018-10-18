import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PageTitle } from '../../components'
import { Container, Segment, Dropdown, Button, Message, Transition } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchFutureEvents, oldestDate } from '../../actions/'

class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldestDate: null,
      endDatetime: null,
      year: null,
      month: null,
      error: false,
      errorMessage: ''
    }
  }

  componentWillMount () {
    const { oldestDate } = this.props
    oldestDate()
  }

  componentWillReceiveProps(props) {
    const { dateTime } = props
    this.setState({ oldestDate: dateTime })
  }

  handleYearChange = (e, value) => {
    this.setState({ year: value.value })
  }

  handleMonthChange = (e, value) => {
    this.setState({ month: value.value })
  }

  handleError = () => {
    setTimeout(() => {
      this.setState({
        error: false
      })
    }, 3000)
  }

  downLoadReport = () => {
    if (this.state.month || this.state.month === 0) {
      fetch(`api/report/${this.state.year}/${this.state.month}`).then(res => {
        if (res.status === 500) {
          return res.json()
        } else {
          window.open(`api/report/${this.state.year}/${this.state.month}`, '_self')
        }
      }).then(res => {
        this.setState({ error: true, errorMessage: res.msg })
        this.handleError()
      }).catch(err => err)
    } else {
      fetch(`api/report/${this.state.year}`).then(res => {
        if (res.status === 500) {
          return res.json()
        } else {
          window.open(`api/report/${this.state.year}`, '_self')
        }
      }).then(res => {
        this.setState({ error: true, errorMessage: res.msg })
        this.handleError()
      }).catch(err => err)
    }
  }

  render () {
    const months = [
      { key: 12, value: null, text: 'None' },
      { key: 0, value: 0, text: 'January' }, { key: 1, value: 1, text: 'February' },
      { key: 2, value: 2, text: 'March' }, { key: 3, value: 3, text: 'April' }, { key: 4, value: 4, text: 'May' }, { key: 5, value: 5, text: 'June' },
      { key: 6, value: 6, text: 'July' }, { key: 7, value: 7, text: 'August' }, { key: 8, value: 8, text: 'September' },
      { key: 9, value: 9, text: 'October' }, { key: 10, value: 10, text: 'November' }, { key: 11, value: 11, text: 'December' }]
    const years = [{ key: 1, value: 2017, text: 2017 }, { key: 2, value: 2018, text: 2018 }]
    return (
      <Container>
        <PageTitle title="Attendance Reports"></PageTitle>
        <Transition visible={this.state.error} animation='slide down' duration={500}>
          <Message style={styles.messageBlock} color="red">{this.state.errorMessage}</Message>
        </Transition>
        <Segment>
          <Dropdown style={styles.dropDown} placeholder='Year' selection options={years} onChange={this.handleYearChange} value={this.state.year}/>
          <Dropdown style={styles.dropDown} disabled={!this.state.year} placeholder='Month' selection onChange={this.handleMonthChange} options={months} value={this.state.month}/>
          <Button style={styles.downloadButton} onClick={this.downLoadReport} disabled={!this.state.year}>Download {months[this.state.month] ? months[this.state.month + 1].text : null } {this.state.year} Report</Button>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    dateTime: state.oldestDate
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    oldestDate
  }, dispatch)
}

const styles = {
  messageBlock: {
    marginBottom: '1em'
  },
  dropDown: {
    margin: '0.5em'
  },
  downloadButton: {
    margin: '0.5em',
    float: 'right'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
