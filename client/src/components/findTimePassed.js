import React, {Component} from 'react';

class FindTimePassed extends Component {

    constructor (props) {
        super(props);

        this.timezoneOffset = new Date().getTimezoneOffset();
        debugger;
        // const created = new Date(props.created.slice(0, -1) + Math.floor(this.timezoneOffset/60));
        // console.log('props.created: ', props.created);
        // console.log('created: ', created);
        this.state = { timePassed: props.created};

        // console.log('Initial State:', this.state);
    }

    componentDidMount () {
        // this.setTimePassed();
        // this.findTimePassedID = setInterval (
        //     () => this.setTimePassed(), 10000
        // );
    }

    componentWillUnmount () {
        clearInterval (this.findTimePassedID);
    }

    setTimePassed = () => {
        var timeCreated = new Date(this.props.created.slice(0, -1) + Math.floor(this.timezoneOffset/60));
        // var date = new Date ();
        // console.log("date:         ", date, "\ntime created: ", timeCreated);
        // var now = date.getTime();
        var result = Date.now() - timeCreated;
        this.setState({ timePassed: result });
    }

    findTimePassed = () => {
        const { timePassed } = this.state;
        // console.log('TIME PASSED:', timePassed);
        if(timePassed >= 86400000){
            var numOfDays = timePassed / 86400000;
            // this.setState({timePassed: numOfDays});
            // console.log("num of days: ", numOfDays);
            return `Updated : ${Math.floor(numOfDays)} days ago`;
        }
        else if(timePassed >= 3600000){
            var numOfHours = timePassed / 3600000;
            // this.setState({timePassed: numOfHours});
            // console.log("num of hrs: ", numOfHours);
            return `Updated : ${Math.floor(numOfHours)} hours ago`;
        }
        else if(timePassed >= 60000){
            var numOfMinutes = timePassed / 60000;
            // this.setState({timePassed: numOfMinutes});
            // console.log("num of mins: ", numOfMinutes);
            return `Updated : ${Math.floor(numOfMinutes)} minutes ago`;
        }
        // else if (result >= 1000){
        //     var numOfSeconds = result / 1000;
        //     this.setState({timePassed: numOfSeconds});
        //     console.log("num of seconds: ", numOfSeconds);
        //     return `Updated : ${Math.floor(this.state.timePassed)} seconds ago`;
        // }
        else {
            return "Updated : Now";
        }
    }

    render () {
        // console.log("THIS IS STATE: ", this.state);

        return (
            <div className = "col s12 white-text">{this.findTimePassed()}</div>
        );
    }
    
}

export default FindTimePassed;

