
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../../server/managingCards';
import kangaroo from '../assets/images/kangaroo_logo_3.png'
import "../assets/css/logIn.css";


class LogIn extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount(){
        this.getUserData();
    }

    componentDidUpdate() {
        console.log("State after using set state ", this.state);
    }
    // example async call
    // async getUserData(){
    //     try{
    //         // const resp = await axios.get(BASE_URL + API_KEY);
    //         // const resp = await axios.get(dummyData);
    //         this.setState({
    //             data: dummyData,
                
    //         });
    //     }catch(err){
    //         this.setState({
    //             error: 'Error getting userData'
    //         });
    //     }
    // }
    getUserData(){
        this.setState({
            data: dummyData,
        })
    }
    render(){
        return(
            <div className="center">
                <div className="border">Log in Page</div>
                <img src={kangaroo}></img>
                <p className ="font">Pocket Cards</p>
                <div>Welcome to Pocket Cards, our mission is to help students practice and master whatever they are learning. Pocket Cards provides engaging, customizable flashcards with contributions from people everywhere.</div>
                <div className="row">
                    <Link to ="/editSets" className="btn light blue darken-2">Sign Up</Link>
                    <Link to ="/profile" className="btn black darken-2">Log In Now</Link>
                </div>
            </div>
        )
    }
}

export default LogIn;
