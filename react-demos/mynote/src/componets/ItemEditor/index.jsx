import React,{PropTypes} from 'react';
import './index.css';

const propTypes = {
    item:PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

class ItemEditor extends React.Component{
    render(){
        const {onSave,onCancel} = this.props;
        const noneitem = {
            title:'',
            content:''
        };
        const item = this.props.item||noneitem;

        let btnText = item.id? '保存' :'创建';
        let save = ()=>{
            onSave({
                ...item,
                title:this.refs.title.value,
                content:this.refs.content.value
            });
        };

        return(
            <div className="itemEditor-componet">
                <div className="btncontorl">
                    <button onClick = {save} className="btn btn-save">{btnText}</button>
                    <button onClick = {onCancel} className="btn btn-craeate">取消</button>
                </div>
                <div className="content-area">
                    <input type="text" placeholder = "请输入标题" ref = "title" defaultValue={item.title}/>
                    <textarea ref = "content" placeholder = "请开始你的表演" defaultValue = {item.content}></textarea>
                </div>
            </div>
        )
    }
}

ItemEditor.propTypes = propTypes;
export default ItemEditor;