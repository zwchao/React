import React, { PropTypes } from 'react';
import marked from 'marked';
import './index.css';

const propTypes = {
    item:PropTypes.object,
    onEdit:PropTypes.func.isRequired,
    onDelete:PropTypes.func.isRequired
};

function ItemShow({item,onEdit,onDelete}){
    if(!item||!item.id){
        return(
            <div className="showError">
                <div className="no-select">请选择左侧列表文章</div>
            </div>
        );
    }

    const content = marked(item.content);

    console.log(item);

    return(
        <div className="show-component">
            <div className="button-area">
            <button onClick={()=>onEdit(item.id)} className="btn btn-edit">编辑</button>
            <button onClick = {()=>onDelete(item.id)} className="btn btn-delete">删除</button>
            </div>
            <h2>{item.title}</h2>
            <div className="edit-area">
            <div dangerouslySetInnerHTML={{__html:content}}/>
            </div>
        </div>
    );
}

ItemShow.propTypes = propTypes;

export default ItemShow;