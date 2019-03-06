import React from 'react';
import propTypes from 'prop-types';
import { Modal, Form, Input, Tooltip, Icon, Button, notification } from 'antd';

import axios from '../../../Api';

import './index.css';

class AccountModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible,
            username: '',
            password: '',
            proxy: '',
            loading: false
        }

        this.handleCancel = this.handleCancel.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleProxyChange = this.handleProxyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCancel() { 
        this.props.toggleModal();
        this.setState({username: '', password: '', proxy: ''}, () => {
            this.props.form.setFieldsValue({
                password: this.state.password,
                username: this.state.username,
                proxy: this.state.proxy
            });
        });
    }

    handleUsernameChange(e) { this.setState({ username: e.target.value }); }
    handlePasswordChange(e) { this.setState({ password: e.target.value }); }
    handleProxyChange(e) { this.setState({ proxy: e.target.value }); }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) { console.error(err); }
            else {
                this.setState({loading: true});

                const app_token = sessionStorage.getItem('app-token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

                axios.post('/accounts', {
                    username: this.state.username,
                    password: this.state.password,
                    proxy: this.state.proxy
                }).then(response => {
                    this.setState({loading: false});
                    this.props.updateAccountsState(response.data);
                    this.props.toggleModal();
                }).catch(error => {
                    this.setState({loading: false});
                    notification.error({
                        message: 'Error',
                        description: 'We could not connect to Instagram, maybe you entered the wrong credentials'
                    })
                })

            }
        })
    }

    // Permet de mettre à jour la variable `visible`
    // présente dans le state, à chaque re-render.
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.state.visible) {
            this.setState({ visible: nextProps.visible });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const FormItem = Form.Item;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };

        return (
            <Modal
                title="Let's add an account!"
                visible={this.props.visible}
                onCancel={this.handleCancel}
                footer={(
                    <div>
                        <Button onClick={this.handleCancel}>Cancel</Button>
                        <Button
                            loading={this.state.loading}
                            type="primary"
                            htmlType="submit"
                            onClick={this.handleSubmit}>Proceed
                        </Button>
                    </div>
                )}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="Username" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your instagram username' }]
                            })(<Input onChange={this.handleUsernameChange} />)
                        }
                    </FormItem>
                    <FormItem label="Password" {...formItemLayout} hasFeedback>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password' }]
                            })(<Input type="password" onChange={this.handlePasswordChange} />)
                        }
                    </FormItem>
                    <FormItem
                        label={(
                            <span>
                                Proxy&nbsp;
                                <Tooltip title="Altough it's optional, we strongly recommend you to use a proxy.">
                                    <Icon type="exclamation-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                        {...formItemLayout}
                        hasFeedback
                        extra={(
                            <div>
                                <b>Proxy format:</b>
                                <p style={{margin: '0'}}>Unauthenticated: http(s)://host.com(:port)</p>
                                <p style={{margin: '0'}}>Authenticated: http(s)://user:pass@host.com(:port)</p>
                            </div>
                        )}
                    >
                        {getFieldDecorator('proxy', {
                            rules: [{ pattern: /(https?|socks(4|5)):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?/, message: `Doesn't look like a valid proxy.` }]
                        })(<Input onChange={this.handleProxyChange} />)}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}


AccountModal.propTypes = {
    visible: propTypes.bool.isRequired,
    toggleModal: propTypes.func.isRequired
}

export default Form.create()(AccountModal);