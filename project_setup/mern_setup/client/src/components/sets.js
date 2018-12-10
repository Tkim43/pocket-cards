
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/sets.css'
import { connect } from 'react-redux';
import {getSetsData} from '../actions';

class Sets extends Component{
    componentDidMount(){
        this.props.getSetsData(this.props.match.params.set_id);
    }

    render(){

        const userCategory = this.props.category;

        const userSubCategory = this.props.sets.map ((item, index) => {
            console.log('ITEM:', item);
            return(
                <div key= {index} className="row set">
                    <Link to="/displayCard" className ="btn blue darken-2">{item}</Link>
                </div>
            );  
        }
    );

        return(
            <div className="center">
                <div className="border">{userCategory}</div>
                <div>{userSubCategory}</div>
                <div className="row">
                    <Link to ="/flashcardGeneration" className="btn blue darken-2">Edit sets</Link>
                    <Link to ="/profile" className="btn grey darken-2">Home</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log("this is the state", state)
    return{
        category:state.sets.category,
        sets:state.sets.sets
        
    }
}

// export default auth(Sets);
export default connect(mapStateToProps, {
    getSetsData: getSetsData
})(Sets);

