import React from 'react';
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signIn: true,
            confirmDirty: false,
            name: '',
            password: '',
            repassword: '',
            loginSucceed: true,
            msg: ''
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('received values of form:', values);
                fetch("http://127.0.0.1:5000/signin",{
                    method: 'POST',
                    mode: "cors",
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `name=${values.name}&password=${values.password}`
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

    changeFromToRegister = () => {
        this.setState({signIn: false})
    }

    changeFromToLogin = () =>{
        this.setState({signIn: true})
    }

   



    register = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err,values) =>{
            if(!err){
                console.log('received values of form:', values);
                fetch("http://127.0.0.1:5000/signup",{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `name=${values.name}&password=${values.password}&conform=${values.conform}`
                }).then(res =>{
                    return res.json();
                }).then(obj =>{
                    console.log('obj',obj);
                    if(obj.status === 'success'){
                        this.setState({msg: obj.msg});
                        /*
                        this.setState({registerSucceed:true});
                        let that = this;
                        setTimeout(function() {
                            console.log('注册成功，2秒后跳转到登录页');
                            that.setState({signIn: true})
                        }, 2000);*/
                    }else if(obj.status === 'error'){

                        this.setState({msg: obj.msg});
                        
                    }
                }).catch(error =>{
                
                })
            }
        })
    }

    handleConformBlur = (e) =>{
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || value});//这有问题 ！！value
    }

    checkPassword = (rule, value, callback) =>{
        const form = this.props.form;
        if(value && value !== form.getFieldValue('password')){
            callback('两次密码不一致！')
        }else{
            callback();
        }
    }

    

    renderSignIn = () =>{
        const {  getFieldDecorator } = this.props.form;
        return(
            <Form className="login-form" onSubmit = {this.handleSubmit.bind(this)}>
                <FormItem>{
                     getFieldDecorator('name',{
                        rules: [{required: true, message: '请输入用户名'}],
                    })( <Input prefix = { <Icon type = "user" style = {{fontSize: 13}} />} placeholder = "用户名" />)
                }
                </FormItem>

                <FormItem>
                    {
                         getFieldDecorator('password',{
                            rules: [{required: true, message: '请输入密码'}]
                        })( < Input prefix = { <Icon type = "lock" style = {{fontSize: 13}} />} placeholder = "密码" />)
                    }
                </FormItem>

                <FormItem>
                    <Button type = "primary" htmlType = "submit" className = "log-form-button">
                    登录
                    </Button>
                    Or <a href="#" onClick = {this.changeFromToRegister}>立即注册</a>
                </FormItem>
                    {this.renderSignInTip()}
            </Form>
        )
    }

    renderSignUp = () =>{
        const {  getFieldDecorator } = this.props.form;
        return(
            <Form className="login-form" onSubmit = {this.register}>
                <FormItem>
                    {
                         getFieldDecorator('name',{
                            rules: [{required: true, message: '请输入用户名'}],
                        })( <Input prefix = { <Icon type = "user" style = {{fontSize: 13}}/>} placeholder = "用户名"/>)
                    }
                </FormItem>

                <FormItem>
                {
                     getFieldDecorator('password',{
                        rules: [{required: true, message: '请输入密码'}]
                    })( < Input prefix = { <Icon type = "lock" style = {{fontSize: 13}} />} placeholder = "密码" />)
                }
               </FormItem>

               <FormItem>
                { getFieldDecorator('conform',{
                    rules: [ {required: true, message: '确认密码'}, {validator: this.checkPassword}],
                })( <Input prefix = { <Icon type = "lock" style = {{fontSize: 13}} />} 
                    type = "password" placeholder = "repassword" onBlur = {this.handleConformBlur} />)}
               </FormItem>

               <FormItem>
                    <Button type = "primary" htmlType = "submit" className = "login-form-button">
                    注册
                    </Button>
                    <a href="#" onClick = {this.changeFromToLogin}>已有帐号，直接登录</a>
               </FormItem>
               {this.rendersignUpTip()}
            </Form>
        )
    }

    rendersignUpTip = () =>{
       return(
           <div>{this.state.msg}</div>
       )
    }

    renderSignInTip = () =>{
        return(
            <div>{this.state.msg}</div>
        )
    }

    render(){
        return(
            <div className="com-log-form">
                <div className="favicon">
                    <p className="log-titile">我的博客</p>
                    {this.state.signIn? this.renderSignIn(): this.renderSignUp()}
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create()(SignupForm);
export default WrappedNormalLoginForm;