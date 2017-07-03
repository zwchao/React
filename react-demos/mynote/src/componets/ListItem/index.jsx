import React,{PropTypes} from 'react';
import './index.css';

const propTypes = {
    item: PropTypes.object.isRequired,
    onClick:PropTypes.func.isRequired
};

function ListItem({item}){
    return(
        <a href="#" className = "item-componet">
            <div className="item-title">{item.title}</div>
            <div className = "item-time">{item.time}</div>
        </a>
    );
}

ListItem.propTypes = propTypes;

export default ListItem;