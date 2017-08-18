import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../actions';

class AddTodo extends Component{
    static propTypes = {
        onAdd:PropTypes.func
    }

    

    
    constructor(props){
        super(props);
        this.state = {
            text:'',
        }
    }

    componentDidMount(){
        this.input.focus();
        this.input.value = '';
        console.log(this.input.value);
    }

    handleTextChange(event){
        this.setState({
            text:event.target.value
        })

    }


    handleAddTodo(event){
        event.preventDefault();
        let inputValue = this.input.value.trim();       
        let length = this.props.todos.filter((todoItem) => {
              return todoItem.text === inputValue;
        }).length;

        if(!inputValue){
            alert('不能为空')
        }else if(length>0){
            alert('您已经添加过该事件，请勿重新添加')
        }else{
            this.props.onAdd(inputValue);
        }

        this.setState({
            text:''
        });
        this.input.focus();
    }

    handleKeyDown(event){
        if(event.keyCode === 13){
        let inputValue = this.input.value.trim();       
        let length =  this.props.todos.filter((todoItem) => {
              return todoItem.text === inputValue;
        }).length;

        if(!inputValue){
            alert('不能为空')
        }else if(length>0){
            alert('您已经添加过该事件，请勿重新添加')
        }else{
            this.props.onAdd(inputValue);
        }
        this.setState({
            text:''
        })
        this.input.focus();
        }
        

    }



    render(){
        return(
            <div className="add-todo">
                <input  type="text" 
                className="new-todo"
                value = {this.state.text}
                onChange = {this.handleTextChange.bind(this)}
                ref = {(input) =>this.input = input}
                onKeyDown = {this.handleKeyDown.bind(this)}
                />
                <button 
                className="add-btn"
                onClick = {this.handleAddTodo.bind(this)}
                >添加</button>
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        todos: state.todos
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAdd:(text) =>{
            dispatch(addTodo(text));
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddTodo);