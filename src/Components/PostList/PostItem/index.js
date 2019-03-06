import React from 'react';
import propTypes from 'prop-types';
import { Button } from 'antd';

import './index.css';

const mediaStyle = {
    width: "100%",
    height: "300px",
    objectFit: "cover"
}

const PostItem = (props) => (
    <div className="card">
        <img src={props.img} alt="" className="media" style={mediaStyle} />
        <div className="overlay">
            <p style={{textAlign: 'center'}}>{props.caption}</p>
            <p>{new Date(props.date).toLocaleString()}</p>
            <Button type="danger" className="posts-list-items-delBtn" onClick={props.deletePost.bind(null, props.pid)}>Delete</Button>
        </div>
    </div>
)

PostItem.propTypes = {
    img: propTypes.string.isRequired,
    date: propTypes.number.isRequired,
    pid: propTypes.number.isRequired,
    caption: propTypes.string.isRequired,
    deletePost: propTypes.func.isRequired
}

export default PostItem;