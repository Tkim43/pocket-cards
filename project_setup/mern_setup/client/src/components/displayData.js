import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../../server/editBack';

class displayData extends Component{
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
    async getUserData(){
        try{
            // const resp = await axios.get(BASE_URL + API_KEY);
            // const resp = await axios.get(dummyData);
            this.setState({
                data: dummyData
            });
        }catch(err){
            this.setState({
                error: 'Error getting userData'
            });
        }
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <div className="border">
                    <h1>Sets</h1>
                </div>
                <div>

                </div>
                <Link to ="/manageSets" className="btn green darken-2">Edit sets</Link>
            </div>
        )
    }
}

export default displayData;