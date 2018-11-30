
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/sets.css'
import dummyData from '../../../server/managingCards';

class Sets extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
            loading: true
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
        setTimeout(() => {
            this.setState({
                data: dummyData,
                loading: false
            })
        }, 750);
    }
    render(){
        console.log(this.state)
        if(this.state.loading){
            return (
                <div className="loading-container">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-blue-only">
                            <div className="circle-clipper left">
                            <div class="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
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

export default Sets;
