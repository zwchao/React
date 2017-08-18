import React,{Component} from 'react';
import {connect} from 'react-redux';
import {view as TodoList}  from './todoList';

class TodoApp extends Component{
    
    render(){
        return(
            <div>
                <div>总任务:{this.props.Alltodos} 剩余任务:{this.props.Lefttodos} 已完成任务:{this.props.Donetodos}</div>
                <TodoList />
               
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        Alltodos:state.todos.length,
        Lefttodos:state.todos.filter((todoItem) => {
        return todoItem.completed === false;
      }).length,
        Donetodos:state.todos.filter((todoItem) =>{
            return todoItem.completed === true;
        }).length
    };
}

export default connect(mapStateToProps,null)(TodoApp);