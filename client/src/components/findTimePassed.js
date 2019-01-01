import React, {Component} from 'react';

class FindTimePassed extends Component {

    constructor (props) {
        super(props);

        this.timezoneOffset = new Date().getTimezoneOffset();
        this.state = { timePassed: props.created};
    }

    findTimePassed = () => {
        const { timePassed } = this.state;
        if(timePassed >= 86400000){
            var numOfDays = timePassed / 86400000;
            return `Created : ${Math.floor(numOfDays)} days ago`;
        }
        else if(timePassed >= 3600000){
            var numOfHours = timePassed / 3600000;
            return `Created : ${Math.floor(numOfHours)} hours ago`;
        }
        else if(timePassed >= 60000){
            var numOfMinutes = timePassed / 60000;
            return `Created : ${Math.floor(numOfMinutes)} minutes ago`;
        }
        else {
            return "Created : Now";
        }
    }

    render () {

        return (
            <div className = "col s12 white-text">{this.findTimePassed()}</div>
        );
    }
    
}

export default FindTimePassed;

