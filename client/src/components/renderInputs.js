import React, {Component} from 'react';

class RenderInput extends Component {

    // componentWillUnmount(){
    //     debugger;
    // }

    render () {
        console.log('INPUT ERROR:', this.props.meta.error);

        return (
            <div className= {`input-field col ${this.props.size}`}>
                <input {...this.props.input} className = "black-text" type= {this.props.type || "text"} id = {this.props.input.name}/>
                <label htmlFor= {this.props.input.name} >{this.props.label}</label>
                <ul>
                    {(this.props.meta.touched || this.props.meta.dirty) && this.props.meta.error && this.props.meta.error.map ( (item, index) => {
                        return <li key = {index} className="red-text">{item}</li>
                    })}
                </ul>
            </div>
        );
    }

}

export default RenderInput;