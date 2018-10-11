import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PageTitle } from '../../components'
import { Container, Segment, Dropdown, Button } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchFutureEvents, oldestDate, getAttendanceReportByMonth, getAttendanceReportByYear } from '../../actions/'

class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {
      oldestDate: null,
      endDatetime: null,
      year: null,
      month: null,
      report: null
    }
  }

  componentWillMount () {
    const { oldestDate } = this.props
    oldestDate()
  }

  componentWillReceiveProps(props) {
    const { dateTime, getAttendanceReportByMonth, getAttendanceReportByYear } = props
    this.setState({ oldestDate: dateTime })
  }

  handleYearChange = (e, value) => {
    this.setState({ year: value.value })
  }

  handleMonthChange = (e, value) => {
    this.setState({ month: value.value })
  }

  downLoadReport = () => {
    let response = ''
    if (this.state.month || this.state.month === 0) {
      let error = false
      fetch(`api/report/${this.state.year}/${this.state.month}`).then().then().catch(err => {
        error = true
        console.log('error: ', error)
        console.error(err)
        // toast
      })
      if (!error) {
        // window.open(`api/report/${this.state.year}/${this.state.month}`, '_self')
      }
    } else {
      console.log('called without month')
      getAttendanceReportByYear(this.state.year)
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
        <Segment>
          <Dropdown placeholder='Year' selection options={years} onChange={this.handleYearChange} value={this.state.year}/>
          <Dropdown disabled={!this.state.year} placeholder='Month' selection onChange={this.handleMonthChange} options={months} value={this.state.month}/>
          <Button onClick={this.downLoadReport}>Download {months[this.state.month] ? months[this.state.month + 1].text : null } {this.state.year} Report</Button>
        </Segment>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    dateTime: state.oldestDate,
    report: state.report
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    oldestDate,
    getAttendanceReportByMonth,
    getAttendanceReportByYear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
