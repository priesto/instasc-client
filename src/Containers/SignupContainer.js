import React from 'react';
import { Redirect } from 'react-router-dom';
import { notification } from 'antd';

import axios from '../Api';
import SignupForm from '../Components/SignupForm';

const openNotification = (desc) => {
    notification.error({
        message: 'Signup Error',
        description: desc
    })
}

export default class SignupContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
            confirmDirty: false,
            signedUp: false
        }

        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirm = this.checkConfirm.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword(form, rule, value, cb) {
        if(value && value !== form.getFieldValue('password')) cb('Passwords are inconsistent.');
        else cb()
    }

    checkConfirm(form, rule, value, cb) {
        if(value && this.state.confirmDirty)
            form.validateFields(['confirm'], {force: true});
        cb();
    }
    
    handleChange(e) {
        const target = Object.keys(e)[0];
        switch (target) {
            case 'email':
                this.setState({email: e.email.value})
                break;
            case 'password':
                this.setState({password: e.password.value})
                break;
            case 'confirm':
                this.setState({passwordConfirm: e.confirm.value})
                break;
            case 'username':
                this.setState({username: e.username.value})
                break;
            default:
                break;
        }
    }
    handleSubmit(form, e) {
        e.preventDefault();
        openNotification('This functionality has been disabled.');
        return;

        form.validateFields((err, values) => {
            if(!err) {
                const { username, password, email } = this.state;
                axios.post('/signup', {
                    username, password, email
                }).then(res => {
                    if(res.status === 201) {
                        sessionStorage.setItem('app-token', res.data.token);
                        this.setState({signedUp: true});
                    }
                }).catch(err => {
                    if(err.response) {
                        const { status } = err.response;
                        if(status === 400 || status === 403) {
                            openNotification('You either entered a wrong email address or forgot to enter some fields');
                        }
                    } else {
                        openNotification(`Something bad happend,
                            but don't worry that's not your fault. We're working hard to fix everything ASAP.`);
                    }
                })
            }
        })
    }

    render() {
        return (
            this.state.signedUp
                ?
                    <Redirect to="/app" />
                :
                    <SignupForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        handleConfirmBlur={this.handleConfirmBlur}
                        checkPassword={this.checkPassword}
                        checkConfirm={this.checkConfirm}
                    />
        )
    }
}