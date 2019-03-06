import React from 'react';
import jwtDecode from 'jwt-decode';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import NotFound from '../Components/NotFound';
import Home from '../Components/Home';

import Login from '../Views/Login';
import Signup from '../Views/Signup';
import App from '../Views/App';

const checkAuth = () => {
    if(sessionStorage.getItem('app-token')) {
        const token = sessionStorage.getItem('app-token');
        try {
            const { exp } = jwtDecode(token);
            if(exp * 1000 < new Date().getTime()) {
                sessionStorage.removeItem('app-token');
                return false;
            }
            return true;
        }
        catch(e) {
            console.error(e);
            return false;
        }
    }
}

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
        <Component {...props}/>
        ) : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}/>
        )
    )}/>
)


const RedirectAuth = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
        <Redirect to={{
            pathname: '/app',
            state: { from: props.location }
        }}/>
        ) : (
        <Component {...props}/>
        )
    )}/>
)

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <RedirectAuth exact path="/login" component={Login} />
            <RedirectAuth exact path="/signup" component={Signup} />
            <AuthRoute path="/app" component={App} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
)