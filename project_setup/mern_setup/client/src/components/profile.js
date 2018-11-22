import React, {Component} from 'react';
import profileInfo from '../dummy_data/profile_info';
import "../assets/css/profile.css";
import picture from "../assets/images/profile_pic.jpg";

class Profile extends Component {

    constructor (props){
        super(props);
        this.state = {
            list : []
        }
    }
    
    componentDidMount () {
        this.getListData ();
        // console.log("test: ", this.state.list.data[0]);
    }
    
    getListData () {
        //Call server to get data
        this.setState ({
            list: profileInfo
        });
        // console.log(this.state.list.data[0].username);
    }

    render () {

        const profileInformation = this.state.list.map( (item,index) => {
            return (
                <div key = {item.id} className="row">
                    <div className="col s2 profile-heading">
                        <img src= {picture} alt="" className="circle responsive-img"></img>
                    </div>
                    <div className="col s10 profile-heading">
                        <div className="black-text">{item.username}</div>
                        <div className="button-profile-heading">
                            <button className = "btn-small light-blue lighten-3">Latest</button>
                            <button className = "btn-small light-blue lighten-3">Alphabetical</button>
                        </div>
                    </div>
                </div>
            );
        } );

        // console.log(this.state.list.data);
        return (
            <div className = "container profile-container">
                {profileInformation}
                {/* <div className = "row">
                    <button className = "btn light-blue lighten-3">Latest</button>
                    <button className = "btn light-blue lighten-3">Alphabetical</button>
                </div> */}
                
                <div className="col s12 card-container">
                    <div className = "card-panel green lighten-2 white-text center">Create a New Category +</div>
                </div>
                <div className="col s12 card-container">
                    <div className = "card-panel green lighten-2 white-text center">Physics</div>
                </div>
                <div className="col s12 card-container">
                    <div className = "card-panel green lighten-2 white-text center">Math</div>
                </div>
                <div className="col s12 card-container">
                    <div className = "card-panel green lighten-2 white-text center">Ginger Rebellion</div>
                </div>
            </div>
        );
    }
}


export default Profile;