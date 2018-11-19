
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Sets extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[]
        }
    }
    componentDidMount(){
        this.getUserData();
    }
    // example async call
    // async getUserData(){
    //     try{
    //         const resp = await axios.get(BASE_URL + API_KEY);
    //         this.setState({
    //             data: resp.data
    //         });
    //     }catch(err){
    //         this.setState({
    //             error: 'Error getting userData'
    //         });
    //     }
    // }
    render(){
        return(
            <div>
                <div className="border">
                    <h1>Sets</h1>
                </div>
                <Link to ="/flashcards" className ="btn green darken-2">Chapter 1</Link>
                <Link to ="/manageSets" className="btn green darken-2">Edit sets</Link>
            </div>
        )
    }
}

export default Sets;
