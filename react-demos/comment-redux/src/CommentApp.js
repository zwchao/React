import React ,{Component} from 'react';
import {view as CommentInput} from './commentInput';
import {view as CommentList} from './commentList';

function CommentApp(){
    return(
        <div className = "wrapper">
            <CommentInput />
            <CommentList />
        </div>
    )
}