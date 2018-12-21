import React, { Component } from 'react';
import "../assets/css/profile.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { sortAlphabetical, sortByLatest} from '../actions';
import BasicModal from './modal';
import DeleteModal from './deleteModal';
import FindTimePassed from './findTimePassed';
import defaultAvatar from '../assets/images/default_avatar.png';
import { deleteCategory} from '../actions';

class Profile extends Component {
    state ={
        show: false,
        categoryID: null
    }

    handleAlphabeticalClick = () => {
        this.props.sortAlphabetical ();
    }

    handleSortByLatestClick = () => {
        this.props.sortByLatest ();
    }
    
    componentDidMount () {
        this.props.sortByLatest ();
    }

    showModal = (categoryID) => {
        this.setState({
            show: true,
            categoryID
        })
    }
    hideModal=()=>{
        this.setState({
            show: false
        })
    }
    delete = async () =>{
        const { categoryID } = this.state;
        const userID = this.props.user.userID
        await this.props.deleteCategory(categoryID,userID);
        this.updateCategoryList();
        this.hideModal();
    }
    async updateCategoryList(){
        try{
            const {sortByLatest} = this.props
            await sortByLatest();
        }catch(err){
            console.log("error getting list data")
        }
    }

    render () { 
        
        if(typeof this.props.user === 'undefined'){
            return <h1>loading spinner</h1>
        }

        const timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;

        const profileCategories =  this.props.sets.map ( (item, ID) => {

            const created = new Date(item.created).getTime();
            // const ms = created - timeZoneOffset;
            // const diff = new Date().getTime() - ms;
            const diff = new Date().getTime() - created;
            
            return (
                <div className="row category-info" key = {item.ID}>
                    <FindTimePassed created={diff}/>

{/* //                     <div className="categoryDiv card-container">
//                         <Link to = {`/sets/${item.ID}`} className = "category col s9 card-panel green lighten-2 white-text center sets-bold-text">{item.category}</Link>
//                         <button className="delete-container red lighten-2 btn-large" onClick={() => this.delete(item.ID)}>
//                                 <i className = "delete large material-icons">delete</i> */}

                    <div className="categoryDiv card-container">
                        <Link to = {`/sets/${item.ID}`} className = "category col s9 card-panel green lighten-2 white-text center sets-bold-text">{item.category}</Link>
                        <button className="delete-container red lighten-2 btn-large" onClick={() => {
                            this.showModal(item.ID)
                        }}>
                            <i className = "delete large material-icons">delete</i>
                        </button>
                    </div>
                </div>
            );
        } );
        
        console.log("this is the props from user: ", this.props.user);
        const profileUserInfo = this.props.user.displayName;

        const profileUserAvatar = this.props.user.avatar || defaultAvatar;

        return (
        <div className = "container">
            <div className = "profile-container row col s12">
                <div className="profile-section">
                    <div className="col s4 profile-section-img">
                        <img src= {profileUserAvatar} alt="" className="circle profile-pic"/>
                    </div>
                    <div className="col s8 avatar-box profile-section-title">
                        <div className="white-text avatar-text">
                        {profileUserInfo}
                        </div>
                    </div>
                </div>
                <div className = "white-text container sort-row row">
                        <strong>Sort:</strong>
                        <button onClick = {this.handleSortByLatestClick} className = "btn-small soft-blue sort-button button-bold-text">Latest</button>
                        <button onClick = {this.handleAlphabeticalClick} className = "btn-small soft-blue sort-button button-bold-text">Alphabetical</button>
                </div>
                <div className="row">
                <div className="col s12 card-container create-category-bold-text">
                        <BasicModal/>
                </div>
                </div>
                {profileCategories}
            </div>
            { this.state.show ? <DeleteModal hideModal={this.hideModal }deleteItem={this.delete} /> : '' }
        </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is the profile state: ", state.user.info);
    return {
        sets: state.sets.categories,
        user: state.user.info
    }
}


export default connect(mapStateToProps, {
    sortAlphabetical : sortAlphabetical,
    sortByLatest: sortByLatest,
    deleteCategory,
})(Profile);