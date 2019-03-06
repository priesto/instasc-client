import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from '../Api';
import LoginForm from '../Components/LoginForm';
import { notification } from 'antd';


const openNotification = () => {
    notification.error({
        message: 'Login Error',
        description: 'An error occured during the login process, maybe you entered a wrong email or password.'
    })
}

export default class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedIn: false,
            loginFailed: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = Object.keys(e)[0];
        target === 'email' ? this.setState({email: e.email})
                           : this.setState({password: e.password})
    }
    
    handleSubmit(props, e) {
        e.preventDefault();

        props.validateFields((err, values) => {
            if(!err) {
                const { email, password } = this.state;
                axios.post('/login', {
                    email, password
                }).then(res => {
                    if(res.status === 200) {
                        sessionStorage.setItem('app-token', res.data.token);
                        sessionStorage.setItem('app-eos', res.data.endOfService);
                        this.setState({loggedIn: true});
                    }
                })
                .catch(err => {
                    openNotification();
                });

            }
        })

    }

    render() { 
        return (
            this.state.loggedIn
                ? 
                    <Redirect to="/app" />
                :
                    <LoginForm
                        email={this.state.email}
                        password={this.state.password}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
        )
    }
}