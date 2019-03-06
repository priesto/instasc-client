import React from 'react';
import propTypes from 'prop-types';
import { Card, Icon } from 'antd';
import PaypalButton from '../PaypalButton';

import './index.css';

const PricePlan = (props) => (
    <Card
        className="price-plan-item"
        style={{textAlign: 'center'}}
        cover={<Icon type="clock-circle-o" style={{ fontSize: 46, color: '#08c', padding: 24 }}/>}
        actions={[<PaypalButton total={props.price} onError={props.onError} onSuccess={props.onSuccess}/>]}
    >
        <h2>{props.duration} days</h2>
        <h4 style={{color: '#757575'}}>${props.price}</h4>
    </Card>
)

PricePlan.propTypes = {
    duration: propTypes.number.isRequired,
    price: propTypes.number.isRequired,
    onError: propTypes.func.isRequired,
    onSuccess: propTypes.func.isRequired
}

export default PricePlan;