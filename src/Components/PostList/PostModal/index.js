import React from 'react';
import moment from 'moment';
import propTypes from 'prop-types';
import {
    Modal,
    Upload,
    Button,
    Icon,
    Input,
    Form,
    Row,
    Col,
    DatePicker,
    TimePicker,
    message
} from 'antd';

import './index.css';

import { baseURL } from '../../../Api/config';

const Dragger = Upload.Dragger;
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class PostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
            caption: '',
            date: '',
            time: '',
            eos: ''
        }

        this.handleCaptionChange = this.handleCaptionChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    handleCaptionChange(e) { this.setState({caption: e.target.value}); }
    handleDateChange(date, dateStr) { this.setState({date: dateStr}); }
    handleTimeChange(time, timeStr) { this.setState({time: timeStr}); }

    componentDidMount() {
        const eos = sessionStorage.getItem('app-eos');
        this.setState({eos: eos});
    }

    disabledDate(current) {
        const now = moment();
        const max = moment.unix(this.state.eos / 1000);
        return !(moment(current).isBetween(now, max, 'day', '[]'));
    }

    async handleSubmit() {
        const m_ref = message.loading();

        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        const { caption, date, time } = this.state;
        const timestamp = new Date(`${date} ${time}`).getTime();

        // Used xhr instead of axios, due axios's bug with formdata.

        formData.append('caption', caption);
        formData.append('timestamp', timestamp);
        formData.append('aid', this.props.aid);
        formData.append('img', this.state.fileList[0]);

		xhr.open('POST', `${baseURL}/posts`);
        xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('app-token')}`);
        xhr.send(formData);

        const ref = this.props.updatePosts;

        xhr.onreadystatechange = function(event) {
            // XMLHttpRequest.DONE === 4
            if (this.readyState === XMLHttpRequest.DONE) {
                m_ref();
                if (this.status >= 200 && this.status < 300) {
                    // Server returns an array of posts.
                    // It's inside this.reponse, but need to parse it before.
                    // Once parsed extract the object.
                    try {
                        const p = JSON.parse(this.response);
                        ref(...p);
                        message.success('Post scheduled successfully.');
                    } catch(e) {
                        console.error(e);
                        message.warning('Post scheduled, but we could not parse server response.');                        
                    }
                } else {
                    message.error('We were unable to schedule this post, please try again later.');
                }
            }
        };
    }

    render() {

        const uploadProps = {
            name: 'img',
            fileList: this.state.fileList,
            action: '/dummy',
            accept: 'image/jpg,image/jpeg,image/png,image/gif',
            beforeUpload: (file) => {
                if(file.size > 1 * Math.pow(10, 6)) {
                    message.error('File too big, max file size is : 1MB.');
                    return false;
                }

                this.setState(({ fileList }) => ({
                    fileList: [file],
                }));
                return false;
            }

        }

        return (
            <Modal
                className="post-modal"
                visible={this.props.postModalVisible}
                onCancel={this.props.toggleModal}
                footer={
                    <Button
                        type="primary"
                        disabled={!(this.state.caption && this.state.date && this.state.time && this.state.fileList.length === 1)}
                        onClick={this.handleSubmit}
                    >
                        Schedule
                    </Button>
                }
            >
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                    <p style={{fontWeight: 'bold'}}>Drop your file here</p>
                    <p style={{margin: '7px 0', fontSize: 'smaller'}}>OR</p>
                    <Button type="primary">Browse</Button>
                </Dragger>
                <Form layout="vertical" className="post-modal-form">
                    <FormItem
                        label="Caption"
                    >
                        <TextArea onChange={this.handleCaptionChange} rows={4}/>
                    </FormItem>
                    <Row gutter={16} style={{marginBottom: '12px'}}>
                        <Col span={12}>
                            <FormItem
                                label="Date"
                            >
                                <DatePicker disabledDate={this.disabledDate} onChange={this.handleDateChange} style={{width: '100%'}} />
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                label="Time"
                            >
                                <TimePicker 
                                    onChange={this.handleTimeChange}
                                    style={{width: '100%'}}
                                    format="HH:mm"
                                />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        )
    }
}

PostModal.propTypes = {
    postModalVisible: propTypes.bool.isRequired,
    toggleModal: propTypes.func.isRequired,
    updatePosts: propTypes.func.isRequired,
    aid: propTypes.string.isRequired,
}

export default PostModal;
