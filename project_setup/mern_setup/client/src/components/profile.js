import React, {Component} from 'react';
import profileInfo from '../dummy_data/profile_info';
import "../assets/css/profile.css";
import picture from "../assets/images/profile_pic.jpg";
import {Link} from 'react-router-dom';
import BasicModal from './modal';

class Profile extends Component {

    constructor (props){
        super(props);
        this.state = {
            list : []
        }; 

    }
    
    componentDidMount () {
        this.getListData ();
    }

    changeSort() {
        
    }
    
    getListData () {
        //Call server to get data
        this.setState ({
            list: profileInfo
        });
        // console.log(this.state.list.data[0].username);
    }

    render () {
        console.log(this.state.list.data);
        const profileInformation = this.state.list.map( (item,index) => {
            return (
                <div key = {item.id} className="row">
                    <div className="col s2 profile-heading">
                        <img src= {picture} alt="" className="circle responsive-img profile-pic"></img>
                    </div>
                    <div className="col s10 profile-heading">
                        <div className="black-text">{item.username}</div>
                        {/* <div className="button-profile-heading">
                            <button className = "btn-small light-blue lighten-3">Latest</button>
                            <button className = "btn-small light-blue lighten-3">Alphabetical</button>
                        </div> */}
                    </div>
                </div>
            );
        } );

        // console.log(this.state.list.data);
        return (
    <div>
            <div className = "container profile-container">
                {profileInformation}
                <div className = "sort-row row">
                    <div className="sort col s12">Sort: 
                        <button className = "btn-small light-blue lighten-3 sort-button">Latest</button>
                        <button className = "btn-small light-blue lighten-3 sort-button">Alphabetical</button>
                    </div>
                </div>
                <div className="row">
                <div className="col s12 card-container">
                        <BasicModal/>
                </div>
                </div>

                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Physics</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Math</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 card-container">
                        <Link to = "/sets" className = "card-panel green lighten-2 white-text center">Ginger Rebellion</Link>
                    </div>
                </div>
            </div>
</div>
        );
    }
}


export default Profile;