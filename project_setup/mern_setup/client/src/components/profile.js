import React, {Component} from 'react';
import "../assets/css/profile.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sortAlphabetical, sortByLatest } from '../actions';
import BasicModal from './modal';

class Profile extends Component {

    handleAlphabeticalClick = () => {
        this.props.sortAlphabetical ();
    }

    handleSortByLatestClick = () => {
        this.props.sortByLatest ();
    }

    findTimePassed = item => {
        var timeCreated = new Date (item.created);
        var date = new Date();
        var now = date.getTime();
        var result = now - timeCreated.getTime();
        if(result >= 86400000){
            var numOfDays = result / 86400000;
            return `Updated : ${Math.floor(numOfDays)} days ago`;
        }
        else if(result >= 3600000){
            var numOfHours = result / 3600000;
            return `Updated : ${Math.floor(numOfHours)} hours ago`;
        }
        else if(result >= 60000){
            var numOfMinutes = result / 60000;
            return `Updated : ${Math.floor(numOfMinutes)} minutes ago`;
        }
        else if (result >= 1000){
            var numOfSeconds = result / 1000;
            return `Updated : ${Math.floor(numOfSeconds)} seconds ago`;
        }
        else {
            return "Updated : Now";
        }
    }
    
    componentDidMount () {
        this.props.sortByLatest ();
    }

    render () { 
        if(typeof this.props.user === 'undefined'){
            return <h1>loading spinner</h1>
        }

        const profileCategories =  this.props.sets.map ( (item, ID) => {
            
            return (
                <div className="row category-info" key = {item.ID}>
                    <div className = "col s12 white-text">{this.findTimePassed(item)}</div>
                    <div className="col s12 card-container">
                        <Link to = {`/sets/${item.ID}`} className = "card-panel green lighten-2 white-text center sets-bold-text">{item.category}</Link>
                    </div>
                </div>
            );
        } );

        const profileUserInfo = this.props.user.displayName;

        const profileUserAvatar = this.props.user.avatar;

        return (
        <div className = "container">
            <div className = "profile-container row col s12">
                <div className="profile-section">
                    <div className="col s4">
                        <img src= {profileUserAvatar} alt="" className="circle profile-pic"/>
                    </div>
                    <div className="col s8 avatar-box">
                        <div className="white-text avatar-text">
                        {profileUserInfo}
                        </div>
                    </div>
                </div>
                <div className = "sort-row row">
                    <div className="sort col s12 white-text">Sort: 
                        <button onClick = {this.handleSortByLatestClick} className = "btn-small soft-blue sort-button button-bold-text">Latest</button>
                        <button onClick = {this.handleAlphabeticalClick} className = "btn-small soft-blue sort-button button-bold-text">Alphabetical</button>
                    </div>
                </div>
                <div className="row">
                <div className="col s12 card-container create-category-bold-text">
                        <BasicModal/>
                </div>
                </div>
                {profileCategories}
            </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is the state", state);
    return {
        sets: state.profile.sets,
        user: state.profile.user
    }
}


export default connect(mapStateToProps, {
    sortAlphabetical : sortAlphabetical,
    sortByLatest: sortByLatest,
})(Profile);