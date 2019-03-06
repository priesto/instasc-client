import React from 'react';
import propTypes from 'prop-types';
import RPEA from 'react-paypal-express-checkout';

const client = {
    sandbox: 'ASB6ZStDd1sld-umjEZVAJP-6AcFP3NKc_MnDV-Sm5LMUGuXvgROVKg784pQUOcySVaplvOYXaUOrDu5',
    production: 'AX9I54U3s81_UyQS6CO472LeAQN18dAsJJ0jEQokw8paoFd3EJ0-sFzl64wk7SgfNY8dsA45gtQKtfh2'
}

const style = {
    tagline: false
}

const PaypalButton = (props) => <RPEA client={client} total={props.total} currency="USD" style={style} onError={props.onError} onSuccess={props.onSuccess}/>

PaypalButton.propTypes = {
    total: propTypes.number.isRequired,
    onSuccess: propTypes.func.isRequired,
    onError: propTypes.func.isRequired
}

export default PaypalButton;