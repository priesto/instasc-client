import React from 'react';
import propTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const SettingsModal = (props) => {

    const { getFieldDecorator, getFieldError, getFieldValue, setFieldsValue } = props.form;

    //setFieldsValue({'proxy': props.proxy});

    const proxyError = getFieldError('proxy');

    const proxy = getFieldValue('proxy');
    const password = getFieldValue('password');

    const disabled = (!proxy && !password) || proxyError;

    return (
        <Modal
            title="Update account"
            visible={props.visible}
            onCancel={props.close}
            footer={(
                <div>
                    <Button onClick={props.close}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={props.handleSubmit}
                        disabled={disabled}
                        loading={props.loading}
                        >
                            Save
                    </Button>
                </div>
            )}
        >
            <Form layout="vertical">
                <FormItem label="New password" hasFeedback>
                    {getFieldDecorator('password', {
                            rules: [{ message: 'Please input your new password' }]
                        })(<Input onChange={props.handlePasswordChange} type="password" />)}
                </FormItem>
                <FormItem label="New proxy" hasFeedback extra="Leave fields, that you don't want to change, empty.">
                    {getFieldDecorator('proxy', {
                            rules: [{ pattern: /(https?|socks(4|5)):\/\/(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?/, message: 'Doesn\'t look like a valid proxy' }]
                        })(<Input onChange={props.handleProxyChange} type="text" />)}
                </FormItem>
            </Form>
        </Modal>
    )
}

SettingsModal.propTypes = {
    visible: propTypes.bool.isRequired,
    close: propTypes.func.isRequired,
    proxy: propTypes.string.isRequired,
    loading: propTypes.bool.isRequired,
    handleSubmit: propTypes.func.isRequired,
    handleProxyChange: propTypes.func.isRequired,
    handlePasswordChange: propTypes.func.isRequired
}

export default Form.create()(SettingsModal);