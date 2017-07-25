import {ADD_COMMENT} from './actionTypes';

export default function(state,action){
    if(!state){
        state = {comments:[]}
    }
    switch (action.type) {
        case ADD_COMMENT:
            return{
                comments:[...state.comments,action.comment];
            }
        default:
            return state
    }
}