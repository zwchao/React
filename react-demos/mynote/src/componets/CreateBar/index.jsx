import React,{PropTypes} from 'react';
import './index.css';

const propTypes = {
    onClick:PropTypes.func.isRequired
}

function CreateBar({onClick}){
    return(
        <a href="#" onClick = {onClick} className="create-component">+创建新的文章</a>
    );

}

CreateBar.propTypes = propTypes;

export default CreateBar;