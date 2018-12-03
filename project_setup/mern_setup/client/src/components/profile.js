import React, {Component} from 'react';
import "../assets/css/profile.css";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileData, sortAlphabetical, sortByLatest } from '../actions';
import BasicModal from './modal';

class Profile extends Component {

    handleAlphabeticalClick = () => {
        console.log('button was clicked');
        this.props.sortAlphabetical ();
    }

    handleSortByLatestClick = () => {
        console.log('SORT button was clicked');
        this.props.sortByLatest ();
    }
    
    componentDidMount () {
        this.props.sortByLatest ();
    }

    render () { 
        console.log("Profile props: ", this.props);
        if(typeof this.props.user === 'undefined'){
            return <h1>loading spinner</h1>
        }

        const profileCategories =  this.props.sets.map ( (item, ID) => {
            return (
                <div className="row" key = {ID}>
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">{item.category}</Link>
                    </div>
                </div>
            );
        } );

        const profileUserInfo = this.props.user.displayName;

        const profileUserAvatar = this.props.user.avatar;

        return (
        <div className = "container">
            <div className = "profile-container row col s12">
                <div className="row valign-wrapper profile-section">
                    <div className="col s4">
                        <img src= {profileUserAvatar} alt="" className="circle profile-pic"/>
                    </div>
                    <div className="col s8">
                        <div className="black-text avatar-text">
                        {profileUserInfo}
                        </div>
                    </div>
                </div>
                <div className = "sort-row row">
                    <div className="sort col s12">Sort: 
                        <button onClick = {this.handleSortByLatestClick} className = "btn-small light-blue lighten-3 sort-button">Latest</button>
                        <button onClick = {this.handleAlphabeticalClick} className = "btn-small light-blue lighten-3 sort-button">Alphabetical</button>
                    </div>
                </div>
                <div className="row">
                <div className="col s12 card-container">
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
    return {
        sets: state.profile.sets,
        user: state.profile.user
    }
}


export default connect(mapStateToProps, {
    sortAlphabetical : sortAlphabetical,
    sortByLatest: sortByLatest
})(Profile);