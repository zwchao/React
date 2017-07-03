import React from 'react';
import uuid from 'uuid';

import CreateBar from '../CreateBar';
import ItemEditor from '../ItemEditor';
import ItemShow from '../ItemShow';
import List from '../List';

import './index.css'


class Destmark extends React.Component{
   constructor(props) {
    super(props);

    this.state = {
      items: [],
      selectedId: null,
      editing: false,
    };

    this.selectItem = this.selectItem.bind(this);
    this.saveItem = this.saveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.createItem = this.createItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.test = this.test.bind(this);
  }

  selectItem(id) {
    if (id === this.state.selectedId) {
      return;
    }

    this.setState({
      selectedId: id,
      editing: false,
    });
  }

  saveItem(item) {
    let items = this.state.items;

    function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

    // new item
    if (!item.id) {
      items = [...items, {
        ...item,
        id: uuid.v4(),
        time: getNowFormatDate(),
      }];
    // existed item
    } else {
      items = items.map(
        exist => (
          exist.id === item.id
          ? {
            ...exist,
            ...item,
          }
          : exist
        )
      );
    }

    this.setState({
      items,
      selectedId: item.id,
      editing: false,
    });
  }

  deleteItem(id) {
    if (!id) {
      return;
    }

    this.setState({
      items: this.state.items.filter(
        result => result.id !== id
      ),
    });
  }

  createItem() {
    this.setState({
      selectedId: null,
      editing: true,
    });
  }

  editItem(id) {
    this.setState({
      selectedId: id,
      editing: true,
    });
  }

  cancelEdit() {
    this.setState({ editing: false });
  }

  test(){
      console.log('click');
  }


    render(){
        const {items,selectedId,editing} = this.state;
        const selected = selectedId&&items.find(item =>item.id ===selectedId);
        const mainPart = editing
        ?(
            <ItemEditor 
            item = {selected}
            onSave = {this.saveItem}
            onCancel = {this.cancelEdit}
            />
        )
        :(
            <ItemShow
            item ={selected}
            onEdit = {this.editItem}
            onDelete = {this.deleteItem}
            />
        );

        return(
            <div className="main">
                <div className="header">逼格笔记</div>
                <div className="contanier">
                    <CreateBar onClick = {this.createItem}/>
                    <List
                     items={this.state.items}
                     onSelect={this.test}
                    />
                    {mainPart}
                </div>

            </div>
        )
    }
  

}

export default Destmark;