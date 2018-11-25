import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../../server/editFront';

class displayFront extends Component{
    constructor(props){
        super(props)
        this.state ={
            data:[],
        }
    }
    componentDidMount(){
        this.getUserData();
    }

    componentDidUpdate() {
        // console.log("State after using set state ", this.state);
    }
    // example async call
    // async getUserData(){
    //     try{
    //         // const resp = await axios.get(BASE_URL + API_KEY);
    //         // const resp = await axios.get(dummyData);
    //         this.setState({
    //             data: dummyData
    //         });
    //     }catch(err){
    //         this.setState({
    //             error: 'Error getting userData'
    //         });
    //     }
    // }
    getUserData (){
        this.setState({
            data: dummyData,
            front_description: dummyData[0].front_description
        })
    }
    render(){
        console.log(this.state)
        const {front_description} = this.state
        console.log(front_description)
        return(
            <div>
                <div className="row">
                    <h1>Front of Card</h1>
                </div>
                <div className="card border center">{front_description}</div>
                <div className="row">
                    <Link to ="/displayBack" className="btn green darken-2">Flip to Back</Link>
                    <Link to ="/sets" className="btn green darken-2">Card Set Complete</Link>
                    <Link to ="/manageSets" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

export default displayFront;