import React, {Component} from 'react';
import '../assets/css/dropdown.css';
import { sendAvatar } from '../actions';
import { connect } from 'react-redux';

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
    this.props.sendAvatar(item);
  }

  // onAvatarClick = async (values) => {
  //   debugger;
  //   this.props.sendAvatar(values);
  // }

  render() {
    console.log("THIS IS THE AVATAR STATE: ", this.state);
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
      <input type="hidden" name={this.state.name} value={this.state.selectedItem.value} />
    </div>
  }
}

function mapStateToProps (state){
  debugger;
  console.log("MAP STATE TO PROPS STATE: ", state);
  return {
      avatar: state.info
  }
}

export default connect (mapStateToProps, {
  sendAvatar: sendAvatar
})(AvatarImages);