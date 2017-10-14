import React from 'react';
import { Form,Input,Button,Icon } from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;

class createArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
           article:{}
        }
    }

    loadPrimaryfromServer(){
        const url = window.location;
        fetch(url,{
            method: 'GET',
            mode: "cors",
            headers:{
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(response =>{
            return response.json();
        }).then(obj =>{
            console.log(obj);
            this.props.form.setFieldsValue({title:obj.title, content:obj.content})
        }).catch(error =>{
            console.log(error);
        })
    }

    componentDidMount(){
        this.loadPrimaryfromServer();
    }

    handleTitleBlur = (e) =>{
        const value = e.target.value;
        console.log(value);

    }

    create = (e) =>{
        const url = window.location;
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('received values of form:', values);
                fetch(url,{
                    method: 'POST',
                    mode: "cors",
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `title=${values.title}&content=${values.content}`
                }).then(response =>{
                    return response.json();
                }).then(obj =>{
                    console.log('obj',obj);
                    if(obj.status === 'success'){
                        this.setState({msg: obj.msg});
                    }

                    if(obj.status === 'error'){
                        this.setState({msg: obj.msg});
                    }
                    
                }).catch(error =>{
                    console.error(error);
                   this.setState({msg:error.msg});
                })
            }
        })
    }

    renderCreateArticle = () =>{
        const { getFieldDecorator } = this.props.form;
        return(
            <Form className="create-article" onSubmit = {this.create}>
                <FormItem>
                 {
                     getFieldDecorator('title',{
                         rules: [{required: true, message: '请输入文章标题'}],
                     })(<Input prefix = {<Icon type="edit" style = {{fontSize: 13}} />} placeholder = "标题"　/>)
                 }
                </FormItem>

                <FormItem>
                {
                    getFieldDecorator('content',{
                        rules: [{required: true, message: '请输入文章内容'}],
                    })(<TextArea rows={15} />)
                }
               </FormItem>

               <FormItem>
                <Button type = "primary" htmlType = "submit" className = "log-form-button">发表</Button>
           　　</FormItem>

                {this.renderCreateTips()}
            </Form>
            
        )
    }

    renderCreateTips = () =>{
        return(
            <div className="tips">{this.state.msg}</div>
        )
    }

    render(){
        return(
            <div className="articleContanier">
                {this.renderCreateArticle()}
            </div>
        )
    }
}

const CreateArticle = Form.create()(createArticle);
export default CreateArticle;