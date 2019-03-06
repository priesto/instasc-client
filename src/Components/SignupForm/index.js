import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Icon, Input, Divider } from 'antd';

import './index.css';

const FormItem = Form.Item;

const SignupForm = (props) => { 
    const { getFieldDecorator } = props.form;
    return (
        <div className="login-signup-form-container">
            <Form onSubmit={props.handleSubmit.bind(null, props.form)} className="signup-form">
                <FormItem hasFeedback>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            { required: true, message: 'Please input your email address!' },
                            { type: 'email', message: 'This input is not valide E-mail'}
                        ],
                    })(
                        <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: 'Please input your Password!' },
                            { validator: props.checkConfirm.bind(null, props.form) }
                        ],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            { required: true, message: 'Please confirm your Password!' },
                            { validator: props.checkPassword.bind(null, props.form) }
                        ],
                    })(
                        <Input onBlur={props.handleConfirmBlur} prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="signup-form-button">
                        Sign up
                    </Button>
                    <Divider>OR</Divider>
                    <Link to="/login" className="signup-form-button ant-btn ant-btn-ghost ant-btn-lg">Login</Link>
                </FormItem>
            </Form>
        </div>
    )
}

export default Form.create({
    onFieldsChange(props, changedFields) { props.handleChange(changedFields); },
})(SignupForm);