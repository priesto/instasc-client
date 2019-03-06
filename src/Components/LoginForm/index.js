import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Icon, Input, Divider } from 'antd';

import './index.css';

const FormItem = Form.Item;

const LoginForm = (props) => { 
    const { getFieldDecorator } = props.form;

    return (
        <div className="login-signup-form-container">
            <Form onSubmit={props.handleSubmit.bind(null, props.form)} className="login-form">
                <FormItem hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            { type: 'email', message: 'This input is not valide E-mail'},
                            { required: true, message: 'Please input your email address!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <a href="#">Forgot password?</a>
                    <Button 
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                    <Divider>OR</Divider>
                    <Link to="/signup" className="login-form-button ant-btn ant-btn-ghost ant-btn-lg">Sign up</Link>
                </FormItem>
            </Form>
        </div>
    )
}

export default Form.create({
    onValuesChange(props, values) { props.handleChange(values); }
})(LoginForm);