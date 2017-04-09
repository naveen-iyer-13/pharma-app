import React, {Component} from 'react';
import './InputBox.css'

export default class InputBox extends Component {
  render () {
    return (
      <div className="container">
        <div className="labelContainer">
          <label>
            {this.props.label}
          </label>
        </div>
        <div className="inputContainer">
          <input style={{width: "100%", borderRadius: "8px", padding: "5px", outline: "none"}} onChange={this.props.onChangeField}  value={this.props.fieldValue} placeholder={this.props.placeholder} type="text"/>
        </div>
      </div>
    )
  }
}
