import {ADD_TODO,DELETE_TODO,INIT_TODO,TOGGLE_TODO} from './actionTypes';

let nextTodoId = 0;

export const addTodo = (text) =>({
    type: ADD_TODO,
    text:text,
    completed:false,
    id:nextTodoId ++
});

export const deleteTodo = (id) =>({
    type: DELETE_TODO,
    id:id
});

export const initTodo = (todos) =>({
    type:INIT_TODO,
    todos:todos
});

export const toggleTodo = (id) =>({
    type:TOGGLE_TODO,
    id:id
})