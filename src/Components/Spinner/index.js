import React from 'react';
import { Spin } from 'antd';

const style = {
    width: '100%',
    height: '100%',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const Spinner = (props) => (
    <div className="spinner" style={style}>
        <Spin />
    </div>
)

export default Spinner;