import React, {Component, Fragment} from 'react';
import "../assets/css/inputDefinition.css";
import { Field, reduxForm} from 'redux-form'; 
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendCreateCardData} from '../actions';

class InputDefinition extends Component {
  
        state = {
              card_count: 0
          }
          cardCounter = () =>{
              this.setState={
                  card_count: this.state.card_count++
              };
          }

        renderInput (props) {
            return (
                <div className= {`input-field col ${props.size}`}>
                    <input {...props.input} type= {props.type || "text"} id = {props.input.name} autoComplete = "off"/>
                    <label htmlFor= {props.input.name} >{props.label}</label>
                </div>
            );
        }

        handleAddDefinition = (values) => {
            console.log("THIS IS THIS.PROPS: ", this.props);
            console.log("THIS IS THE VALUES", values);
            values.subcategoryId = subcategoryId;
            this.props.sendCreateCardData(values);
        }

        // resetDefinitionForm = (data) => {
        //     const { createRecord, resetForm } = this.props;
        //     return createRecord(data).then(() => {
        //         resetForm();
        //     });   
        // }

        handleEditClick () {
            this.props.history.push('/flashcardGeneration');
        }

        handleDoneClick () {
            this.props.history.push('/profile');
        }
    
        render () {

            console.log("=====PROPS====: ", this.props);
    
            const { handleSubmit, handleEditClick, handleDoneClick } = this.props;
    
            return (
                <Fragment>
                    <div className = "container">
                        <h1>Cards Created: {this.state.card_count}</h1>
        
                        <form onSubmit = {handleSubmit(this.handleAddDefinition)}>
                            <div className="row">
                                <Field name = "frontText" size = "s12" type = "text" label = "Term" component = {this.renderInput}/>
                            </div>
                            <div className="row">
                                <Field name = "backText" size = "s12" type = "text" label = "Definition" component = {this.renderInput}/>
                            </div>
                            <div className = "buttonDiv">
                                <button className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
                                    <i className="material-icons right">add</i>
                                </button>
                            </div>
                            <div className = "buttonDiv">
                                <button onClick={handleEditClick}  className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
                                    <i className="material-icons right">create</i>
                                </button>
                            </div>
                            <div className = "buttonDiv">
                                <button onClick={handleDoneClick} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
                                    <i className="material-icons right">done</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </Fragment>
            ); 
        }
    }
    // state = {
    //     frontText: '',
    //     backText: ''
    // }
    // componentDidMount(){
    //     this.props.sendCreateCardData();
    // }
    // async componentDidMount(){
    //     // this.setState({
    //     //     frontText: this.props.frontText,
    //     //     backText: this.props.backText
    //     // });
    // }

    // componentDidUpdate() {
    //     console.log("This is our current state", this.state);
    // }

    // updateTerm = event => {
    //     this.setState({
    //         frontText: event.currentTarget.value
    //     });
    // }

    // updateDefinition = event => {
    //     this.setState({
    //         backText: event.currentTarget.value
    //     })
    // }

//     handleAddTerm () {
        
    // sendCreateCardDataAdd = async (e) => {
    //     e.preventDefault();
    //     await this.props.sendCreateCardData({topicID:1, frontText:'font text', backText:'back text'});
    //     this.props.history.push('/createflashcards');
    // }

    // sendCreateCardDataEdit = async (e) => {
    //     e.preventDefault();
    //     await this.props.sendCreateCardData({topicID:1, frontText:'this.state.frontText', backText:'hello'});

    //     this.props.history.push('/flashcardGeneration');
    // }

    // sendCreateCardDataDone = async (e) => {
    //     e.preventDefault();
    //     await this.props.sendCreateCardData({topicID:1, frontText:'this.state.frontText', backText:'hello'});
    //     this.props.history.push('/sets');
    // }

//     render () {
//         const { handleSubmit, updateDefinition, updateTerm } = this.props;
//         // const { frontText, backText } = this.state;
//         console.log("this is your props", this.props);

//         return (
//             <div className = "container">
//                 <h1>Cards Created: 10</h1>

//                 <div className="row">
//                     <form className="col s12">
//                         <div className="row">
//                             <div className="input-field col s12">
//                                 <textarea value={this.props.front_description} onSubmit={this.updateTerm}  className="materialize-textarea" id="modal-textarea1"></textarea>
//                                 <label htmlFor="modal-textarea1">Enter Term</label>
//                                 {/* <div className="right-align">{this.frontText.length}/50</div> */}
//                             </div>
                            
//                         </div>
//                         <div className="row">
//                             <div className="input-field col s12">
//                                 <textarea value={this.props.back_description} onSubmit={this.updateDefinition}  className="materialize-textarea" id="modal-textarea2"></textarea>
//                                 <label htmlFor="modal-textarea2">Enter Definition</label>
//                                 {/* <div className="right-align">{backText.length}/150</div> */}
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//                 <div className = "buttonDiv">
//                     <button onClick={this.sendCreateCardDataAdd} className="blue lighten-2 btn waves-effect waves-light btn-large" name="action">Add Card
//                         <i className="material-icons right">add</i>
//                     </button>
//                 </div>
//                 <div className = "buttonDiv">
//                     <button onClick={this.sendCreateCardDataEdit}  className="red lighten-2 btn waves-effect waves-light btn-large" name="action">Edit Cards
//                         <i className="material-icons right">create</i>
//                     </button>
//                 </div>
//                 <div className = "buttonDiv">
//                     <button onClick={this.sendCreateCardDataDone} className="green lighten-2 btn waves-effect waves-light btn-large" type="done" name="action">Done
//                         <i className="material-icons right">done</i>
//                     </button>
//                 </div>
//             </div>
//         );
//     }
// }


function mapStateToProps(state){
    console.log("====NEW PROPS CAT ID, SUB ID====:", state);
    return{
        frontText: state.sets.front_description,
        backText: state.sets.back_description,
        categoryId: state.sets.categoryId,
        subcategoryId: state.sets.subCategoryId
    }
}

InputDefinition = reduxForm ({
    form: "input-defintion",
})(InputDefinition);

export default connect(mapStateToProps,{
    sendCreateCardData
})(withRouter(InputDefinition));