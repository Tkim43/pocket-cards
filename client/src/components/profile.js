import React, {Component} from 'react';
import "../assets/css/profile.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { sortAlphabetical, sortByLatest } from '../actions';
import BasicModal from './modal';
import FindTimePassed from './findTimePassed';
import defaultAvatar from '../assets/images/default_avatar.png';

class Profile extends Component {

    handleAlphabeticalClick = () => {
        this.props.sortAlphabetical ();
    }

    handleSortByLatestClick = () => {
        this.props.sortByLatest ();
    }
    
    componentDidMount () {
        this.props.sortByLatest ();
    }

    render () { 
        if(typeof this.props.user === 'undefined'){
            return <h1>loading spinner</h1>
        }

        const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

        const profileCategories =  this.props.sets.map ( (item, ID) => {

            const created = new Date(item.created).getTime();
            const ms = created - timeZoneOffset;
            const diff = new Date().getTime() - ms;

            return (
                <div className="row category-info" key = {item.ID}>
                    <FindTimePassed created={diff}/>
                    <div className="col s12 card-container">
                        <Link to = {`/sets/${item.ID}`} className = "card-panel green lighten-2 white-text center sets-bold-text">{item.category}</Link>
                    </div>
                </div>
            );
        } );

        const profileUserInfo = this.props.user.displayName;

        const profileUserAvatar = this.props.user.avatar || defaultAvatar;

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
        sets: state.sets.categories,
        user: state.user.info
    }
}


export default connect(mapStateToProps, {
    sortAlphabetical : sortAlphabetical,
    sortByLatest: sortByLatest,
    // update
})(Profile);