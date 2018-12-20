import React, {Component} from 'react';
// import crab from '../assets/images/avatarImages/crab';
// import crocodile from '../assets/images/avatarImages/crocodile';
// import fish from '../assets/images/avatarImages/fish';
// import frog from '../assets/images/avatarImages/frog';
// import rabbit from '../assets/images/avatarImages/rabbit';
// import reindeer from '../assets/images/avatarImages/reindeer';
// import turtle from '../assets/images/avatarImages/turtle';

// class AvatarImages extends Component {
//     state = {
//         avatars: this.props.avatars || [],
//         showItems: false,
//         selectedItem: this.props.avatars && this.props.avatars[0]
//     }

//     dropDown = () => {
//         this.setState(prevState => ({
//             showItems: !prevState.showItems
//         }))
//     }

//     selectItem = item => this.setState({
//         selectedItem: item,
//         showItems: false
//     })

//     render () {
//         return (
//             <div>
//                 <div className = "select-box--container">
//                     <div className="select-box--selected-item">{this.state.selectedItem.value} 
//                         <div className = "select-box--arrow" onClick = {this.dropDown}>
//                             <span className = {`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}></span>
//                         </div>
//                         <div style = {{display: this.state.showItems ? 'block' : 'none'}}>
//                             {
//                                 this.state.avatars.map(item => <div key = {item.id}
//                                 onClick = {() => this.selectedItem(item)}
//                                 className = {this.state.selectedItem === item ? 'selected' : ''}>
//                                     {item.value}
//                                 </div>)
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


// export default AvatarImages;

// import React from 'react'

import '../assets/css/dropdown.css'

class AvatarImages extends Component {
  state = {
    avatars: this.props.avatars || [],
    showItems: false,
    selectedItem: this.props.avatars[0] || this.props.avatars
  }

  dropDown = () => {
    this.setState(prevState => ({
      showItems: !prevState.showItems
    }))
  }

  selectItem = (item) => {
    this.setState({
      selectedItem: item,
      showItems: false,
    })
  }

  render() {
    return <div>
      <div className="select-box--box">
        <div className="select-box--container">
          <div className="select-box--selected-item">
            { this.state.selectedItem.value }
          </div>
          <div
            className="select-box--arrow"
            onClick={this.dropDown}
          ><div className={`${this.state.showItems ? 'select-box--arrow-up' : 'select-box--arrow-down'}`}/></div>
        </div>
        <div
          className="select-box--items"
          style={{display: this.state.showItems ? 'block' : 'none'}}
        >
          {
            this.state.avatars.map(item => <div
              key={item.id}
              onClick={() => this.selectItem(item)}
              className={this.state.selectedItem === item ? 'selected' : ''}
            >
              { item.value }
            </div>)
          }
        </div>
      </div>
      <input type="hidden" name={this.state.name} value={this.state.selectedItem.id} />
    </div>
  }
}

export default AvatarImages