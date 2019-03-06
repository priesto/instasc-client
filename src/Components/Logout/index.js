import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';


class Logout extends React.Component {

    componentDidMount() {
        sessionStorage.removeItem('app-token');
        sessionStorage.removeItem('app-eos');
        this.props.history.push('/login');
    }

    render() {
        return null;
    }

}

Logout.propTypes = {
    history: propTypes.func.isRequired
}

export default withRouter(Logout);