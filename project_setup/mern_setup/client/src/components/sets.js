
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../../server/managingCards';
import { connect } from 'react-redux';

class Sets extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount(){
        this.getUserData();
        if(!this.props.auth){
            this.props.history.push("/signin");
        }
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
        console.log(this.state)
        const userSets = this.state.data.map((item,index) =>{
            return(
                <div key= {index} className="row set">
                    <Link to="/displayFront" className ="btn blue darken-2">{item.subCategory}</Link>
                </div>
            )
        });
        return(
            <div className="center">
                <div className="border">Physics</div>
                <div>{userSets}</div>
                <div className="row">
                    <Link to ="/flashcardGeneration" className="btn blue darken-2">Edit sets</Link>
                    <Link to ="/profile" className="btn grey darken-2">Home</Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.user.auth
    }
}

export default connect(mapStateToProps)(Sets);
