
import React, {Component} from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/sets.css'
import { connect } from 'react-redux';
import {getSetsData} from '../actions';

class Sets extends Component{
    componentDidMount(){

        console.log('SETS PROPS:', this.props);

        this.props.getSetsData(this.props.match.params.set_id);
    }

    render(){

    
        // if(this.state.loading){
        //     return (
        //         <div className="loading-container">
        //             <div className="preloader-wrapper big active">
        //                 <div className="spinner-layer spinner-blue-only">
        //                     <div className="circle-clipper left">
        //                     <div class="circle"></div>
        //                     </div>
        //                     <div className="gap-patch">
        //                         <div className="circle"></div>
        //                     </div>
        //                     <div className="circle-clipper right">
        //                         <div className="circle"></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     )
        // }
        
            
        console.log('Sets Props:', this.props)

    //     const userCategory = this.props.category.map ((item, ID) => {
    //       return(
    //             <div key= {ID} className="row set">
    //                 <div className ="btn blue darken-2">{item.category}</div>
    //             </div>
    //         ) 
    //     }
    // );

        const userCategory = this.props.category;

        const userSubCategory = this.props.sets.map ((item, index) => {
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

