
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/sets.css'
import { connect } from 'react-redux';
import { getSetsData , deleteSubcategory, createSubcategory} from '../actions';
import DeleteModal from './deleteModal';

class Sets extends Component{
    state = {
        show: false,
        delete: false,
    };
    
    componentDidMount(){
        this.props.getSetsData(this.props.match.params.set_id);
    }

    delete = async ()=>{
        debugger;
        console.log("these are your delete props", this.props)
        const {deleteSubcategory} = this.props
        await deleteSubcategory(this.props.match.params.topic_id, this.props.match.params.set_id);
        
        this.props.getSetsData(this.props.match.params.set_id);
        this.setState({
            delete: true
        })
        // this.hideModal();
    }

    async updateSubcategoryList(){
        try{
            const {getSetsData, match: {params}} = this.props
            await getSetsData(params.set_id);
        }catch(err){
            console.log("error subcategory list")
        }
    }

    updateSubCategory = event =>{
        this.setState({
            subCategory: event.currentTarget.value
        });
    }

    createSubcategory  = (e) => {
        e.preventDefault();
        const {createSubcategory, match:{params}} = this.props
        createSubcategory(params.set_id, {subCategory: this.state.subCategory})
        this.updateSubcategoryList();
    }

    showModal = (event) =>{
        const buttonType = event.target.classList[0];
        let show = null;
        let remove = null;

        if (buttonType === 'green') {
            show = true;
            remove = false;
        } else {
            show = false;
            remove = true;
        }
        this.setState({
            show: show,
            delete: remove,
        });
    }

    hideModal = () =>{
        this.setState({
            show: false,
            delete: false
        })
    }

    render(){
        if(this.state.show){
            return (
                <div className="basic-modal" onClick={this.hideModal}>
                    <div onClick={e => e.stopPropagation()} className="basic-modal-content">
                        <div onClick={this.hideModal} className="basic-modal-close center">X</div>
                        <div>
                            <form className="col s12">
                                <div className="row"> 
                                    <div className="input-field col s12">
                                        <textarea onChange ={this.updateSubCategory} className="materialize-textarea" id="textarea2"></textarea>
                                        <label htmlFor="textarea2">Create Title</label>
                                    </div>  
                                </div>
                                <div className = "row">
                                    <button onClick = {this.createSubcategory}className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">
                                        Done
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
        
        const { category } = this.props;
        const userSubCategories = this.props.topics.map ((item, index) => {
            return(
                <div key= {index} className="row set">
                    <Link to={`/displayCard/${item.setID}/topic/${item.topicID}/card/0`} className ="btn blue darken-3 ">{item.subCategory}</Link>
                    <div className = "row">
                    <button className="red lighten-2 btn-large">
                        <i className = "large material-icons">delete</i>
                    </button>
                    </div>
                </div>
            );  
        });

        return(
            <div className="center set-container">
                <h3 className="white-text">{category}</h3>
                <div className="col s12">
                    {userSubCategories}
                </div>
                <div className="row">
                    <div className="col s12 center">
                    <button onClick = {this.showModal} className="green btn lighten-2 wide-btn" >Add Title</button>
                        <Link to="/profile" className="btn yellow darken-2 wide-btn">Home</Link>
                    </div>
                </div>
                { this.state.delete ? <DeleteModal deleteItem={this.delete} /> : '' }
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        category: state.sets.category,
        topics: state.sets.topics
        
    }
}

export default connect(mapStateToProps, {
    getSetsData,
    deleteSubcategory,
    createSubcategory
})(Sets);

