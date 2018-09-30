import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PageTitle } from '../../components';
import { Container, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { fetchFutureEvents } from '../../actions/';


class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            something: null,
            endDatetime: '',
            year: '',
            month: '',
        }
        // this.handleStartDatetimeChange = this.handleStartDatetimeChange.bind(this);
        // this.handleEndDatetimeChange = this.handleEndDatetimeChange.bind(this);
        this.handleStartDatetimeChange = this.handleYearChange.bind(this);
    }

    // handleStartDatetimeChange(updated) {
    //     this.setState({oldestDate: updated});
    // };

    // handleEndDatetimeChange(updated) {
    //     this.setState({endDatetime: updated});
    // }

    componentWillMount() {
        const { fetchFutureEvents } = this.props;
        fetchFutureEvents();
    }

    handleYearChange = (e, value) => {
        this.setState({ year: value.value });
    }

    handleMonthChange = (e, value) => {
        console.log(value)
        this.setState({month: value.value});
    }
    
    render() {
        const months = [{key: 0, value: 0, text: 'January'}, {key: 1, value: 1, text: 'February'}, {key: 2, value: 2,
            text: 'March'}, {key: 3, value: 3, text: 'April'}, {key: 4, value: 4, text: 'May'}, {key: 5, value: 5, text: 'June'},
            {key: 6, value: 6, text: 'July'}, {key: 7, value: 7, text: 'August'}, {key: 8, value: 8, text: 'September'},
            {key: 9, value: 8, text: 'October'}, {key: 10, value: 10, text: 'November'}, {key: 11, value: 11, text: 'December'}]
        const years = [{key:1, value: 2017, text: 2017}, {key: 2, value: 2018, text: 2018 }];
        console.log(this.state);
        // console.log(oldestDate);
        return (
            <Container>
                <PageTitle title="Attendance Reports"></PageTitle>
                <Segment>
                    <Dropdown placeholder='Year' selection options={years} onChange={this.handleYearChange} value={this.state.year}/>
                    <Dropdown placeholder='Month' selection onChange={this.handleMonthChange} options={months} value={this.state.month}/>
                    <Button>Download {this.state.month} {this.state.year} Report</Button>
                </Segment>
            </Container>
        );
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchFutureEvents,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Report);