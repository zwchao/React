import React,{Component,PropTypes} from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            checked: this.props.compeleted
        }
    }

    handleCheckboxChange(event){
        this.setState({checked: event.target.checked})
    }

    render(){
       const checkedProp = this.props.completed ? {checked:true} :{};
       return(
        <div className="">
            <li className="todo-item"
            style = {{
                textDecoration:this.props.completed ? 'line-through' : 'none'
            }}
            >
            <input className="toggle" checked = {this.state.checked} type="checkbox" {...checkedProp} readOnly onChange = {this.handleCheckboxChange.bind(this)} onClick={this.props.onToggle} />
            <label className = "text">{this.props.text}</label>
            <button 
            className="remove"
            onClick = {this.props.onDelete}
            >x</button>
            </li>
        </div>
    )
    }
}




TodoItem.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default TodoItem;
