import {ADD_COMMENT} from './actionTypes'

export const addComment = (comment) =>{
    return {
        type: ADD_COMMENT,
        comment:comment
    }
}