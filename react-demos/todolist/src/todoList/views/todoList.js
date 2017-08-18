import React,{Component} from 'react';
import {connect} from 'react-redux';

import {toggleTodo,deleteTodo} from '../actions';
import TodoItem from './todoItem';

const TodoList = ({todos,onDeleteTodo,onToggleTodo}) =>{
    console.log(todos);
    return(
       
        
        <ul className="todo-list">{
             todos.map((item) =>(
                <TodoItem
                key = {item.id}
                text = {item.text}
                completed = {item.completed}
                onToggle = {() => onToggleTodo(item.id)}
                onDelete = {() => onDeleteTodo(item.id)}
                 />
            ))
            
        }
           
        </ul>
        
    )
}

const mapStateToProps = (state) =>{
    return{
        todos:state.todos
    };
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onToggleTodo:(id) =>{
            dispatch(toggleTodo(id));
        },
        onDeleteTodo:id =>{
            dispatch(deleteTodo(id));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList);