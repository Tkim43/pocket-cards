import React, {Component} from 'react';
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