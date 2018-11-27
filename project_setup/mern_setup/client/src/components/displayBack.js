import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dummyData from '../../../server/editBack';

class displayBack extends Component{
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
            back_description: dummyData[0].back_description
        })
    }
    render(){
        console.log(this.state)
        const {back_description} = this.state
        return(
            <div>
                <div className="row">
                    <h1>Back of Card</h1>
                </div>
                <div className="card border center">{back_description}</div>
                <div className="row">
                    <Link to ="/displayFront" className="btn green darken-2">Flip to Front</Link>
                    <Link to ="/sets" className="btn green darken-2">Card Set Complete</Link>
                    <Link to ="/flashcardGeneration" className="btn green darken-2">Edit More Cards</Link>
                </div>
                
            </div>
        )
    }
}

export default displayBack;