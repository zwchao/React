import {ADD_TODO,DELETE_TODO,INIT_TODO,TOGGLE_TODO} from './actionTypes';

export default(state = [],action) =>{
    switch(action.type){
        case ADD_TODO:{
            return[
                {
                    id:action.id,
                    text:action.text,
                    completed:false
                },
                ...state
            ]
        }

        case DELETE_TODO:{
            return state.filter((todoItem) => {
        return todoItem.id !== action.id;
      })
        }

         case TOGGLE_TODO: {
      return state.map((todoItem) => {
        if (todoItem.id === action.id) {
           return {...todoItem, completed: !todoItem.completed};
        } else {
          return todoItem;
        }
      })
    }

        case INIT_TODO:{
            return action.todos;
        }

        default:{
            return state;
        }
    }
}