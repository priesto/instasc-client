import React from 'react';
import { Card, List, Avatar, Button, notification, Popconfirm, message, Row, Col } from 'antd';

import SettingsModal from '../Components/SettingsModal';
import PricePlan from '../Components/PricePlan';

import axios from '../Api';

export default class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            editLoading: false,
            activeAccount: 0,
            activeProxy: '',
            newPassword: '',
            newProxy: '',
        }

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleProxyChange = this.handleProxyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

/*     componentDidMount() {
        try {
            const _accounts = JSON.parse(sessionStorage.getItem('accounts'));
            this.setState({accounts: _accounts});
        } catch (e) {
            console.error(e);
        }
    } */

    showModal(aid, proxy) { this.setState({modalVisible: true, activeAccount: aid, activeProxy: proxy}); }
    hideModal() { this.setState({modalVisible: false}); }

    handlePasswordChange(e) {  this.setState({newPassword: e.target.value}); }
    handleProxyChange(e) { this.setState({newProxy: e.target.value}); }

    async onSuccess(duration, payment) {        
        const app_token = sessionStorage.getItem('app-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;
        
        try {
            const response = await axios.post('/payment', {duration});
            sessionStorage.setItem('app-eos', response.data.endOfService);
            notification.success({message: 'Success', description: 'You increased the duration of your account'});

        } catch (e) {
            console.error(e);
            notification.error({message: 'Error', description: 'An unexpected error occured. Please try again later.'});
        }
    }

    onError(err) {
        console.log('payment error', err);
        notification.error({message: 'Error', description: 'An error occured during the payment, please try again later.'});
    }

    async handleDelete(aid) {
        const app_token = sessionStorage.getItem('app-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;
        
        const hide = message.loading('Action in progress...', 0);
        
        try {
            await axios.delete(`/accounts/${aid}`);

            // Delete account from state.
            const { accounts } = this.props;
            const _accounts = accounts.filter(a => a.aid !== aid);

            // TODO: Deleted account is still present on 'AccountListContainer'.

            //this.setState({accounts: _accounts});

            this.props.updateAccounts(_accounts);

            notification.success({
                message: 'Success',
                description: 'Account deleted successfully!'
            });
        } catch (e) {
            console.error(e);
            notification.error({
                message: 'Error',
                description: 'Unable to delete this account.'
            });
        } finally {
            hide();
        }
    }

    async handleSubmit() {
        const { newPassword, newProxy, activeAccount } = this.state;

        this.setState({editLoading: true});

        const app_token = sessionStorage.getItem('app-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

        try {
            await axios.put('/accounts', {
                aid: activeAccount,
                newPassword,
                newProxy
            });

            this.setState({editLoading: false});

            notification.success({
                message: 'Success',
                description: 'Changes applied successfully!'
            })
        } catch(e) {
            console.error(e);
            this.setState({editLoading: false});            
            notification.error({
                message: 'Error',
                description: 'Unable to send data to the server.'
            });
        }
    }


    render() {

        const { accounts } = this.props;

        return (
            <div style={{width: '85%', margin: '35px auto'}}>
                <Card title="Manage your accounts" hoverable={true}>
                    <List
                        itemLayout="horizontal"
                        dataSource={accounts}
                        renderItem={item => (
                            <List.Item actions={
                                [
                                    <Button type="primary" onClick={this.showModal.bind(null, item.aid, item.proxy)}>Edit</Button>,
                                    <Popconfirm
                                        title="Delete this account?"
                                        onConfirm={this.handleDelete.bind(null, item.aid)}
                                        okText="Yes"
                                        cancelText="No">
                                        <Button type="danger">Delete</Button>
                                    </Popconfirm>
                                ]}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.ig_img} />}
                                    title={<span>{item.ig_username}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
                <Row gutter={16}>
                    <Col span={8}><PricePlan duration={3} price={0.99} onError={this.onError} onSuccess={this.onSuccess.bind(null, 3)}/></Col>
                    <Col span={8}><PricePlan duration={14} price={3.99} onError={this.onError} onSuccess={this.onSuccess.bind(null, 14)}/></Col>
                    <Col span={8}><PricePlan duration={30} price={7.99} onError={this.onError} onSuccess={this.onSuccess.bind(null, 30)}/></Col>
                </Row>
                <SettingsModal
                    visible={this.state.modalVisible}
                    proxy={this.activeProxy}
                    close={this.hideModal}
                    loading={this.state.editLoading}
                    handlePasswordChange={this.handlePasswordChange}
                    handleProxyChange={this.handleProxyChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}