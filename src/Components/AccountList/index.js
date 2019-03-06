import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Button } from 'antd';

import './index.css';

const AccountList = (props) => (
    <section className="account-list">
        <div className="account-list-container">
            <Button icon="user-add" className="account-list-item account-add" onClick={props.toggleModal} />
            {props.accounts.map(account => (
                <Link key={account.aid} to={`/app/account/${account.aid}`}>
                    <Button className={account.aid === props.activeAccount ? 'account-list-item account-item-active' : 'account-list-item'}
                            style={{background: `url(${account.ig_img})`, backgroundSize: 'cover'}}
                            onClick={props.switchActive.bind(null, account.aid)}
                    />
                </Link>
            ))}
        </div>
        {props.children}
    </section>
)

AccountList.propTypes = {
    accounts: propTypes.arrayOf(propTypes.object).isRequired,
    switchActive: propTypes.func.isRequired,
    toggleModal: propTypes.func.isRequired
}

export default AccountList;