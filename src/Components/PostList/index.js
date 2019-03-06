import React from 'react';
import propTypes from 'prop-types';
import PostHeader from './PostHeader';
import PostItem from './PostItem';
import PostModal from './PostModal';

import { Tabs } from 'antd';

import './index.css';

const TabPane = Tabs.TabPane;

const PostList = (props) => {
    let posts = props.posts.filter(p => p.aid == props.aid);

    let failedPosts = posts.filter(post => post.status === 'FAILED');
    let completedPosts = posts.filter(post => post.status === 'COMPLETED');
    let pendingPosts = posts.filter(post => post.status === 'PENDING');

    return (
        <div className="post-list-container">
            <PostHeader getPosts={props.getPosts} toggleModal={props.toggleModal}>
                <TabPane tab={`Pending (${pendingPosts.length})`} key="1">
                    <div className="post-list-items-container">
                        {pendingPosts.map(post => (
                            <PostItem
                                key={post.pid}
                                pid={post.pid}
                                img={post.mediaURL}
                                caption={post.caption}
                                date={post.timestamp}
                                deletePost={props.deletePost}
                            />
                        ))}
                    </div>
                </TabPane>
                <TabPane tab={`Successful (${completedPosts.length})`} key="2">
                    <div className="post-list-items-container">
                        {completedPosts.map(post => (
                            <PostItem
                                key={post.pid}
                                pid={post.pid}
                                img={post.mediaURL}
                                caption={post.caption}                                
                                date={post.timestamp}
                                deletePost={props.deletePost}
                            />
                        ))}
                    </div>
                </TabPane>
                <TabPane tab={`Failed (${failedPosts.length})`} key="3">
                    <div className="post-list-items-container">
                        {failedPosts.map(post => (
                            <PostItem
                                key={post.pid}
                                pid={post.pid}
                                img={post.mediaURL}
                                caption={post.caption}                                
                                date={post.timestamp}
                                deletePost={props.deletePost}
                            />
                        ))}
                    </div>
                </TabPane>
            </PostHeader>
            <PostModal
                postModalVisible={props.postModalVisible}
                toggleModal={props.toggleModal}
                updatePosts={props.updatePosts}
                aid={props.aid}
            />
        </div>
    )
}

PostList.propTypes = {
    posts: propTypes.arrayOf(propTypes.object).isRequired,
    postModalVisible: propTypes.bool.isRequired,
    toggleModal: propTypes.func.isRequired,
    updatePosts: propTypes.func.isRequired,
    deletePost: propTypes.func.isRequired,
    getPosts: propTypes.func.isRequired,
    aid: propTypes.string.isRequired,
}

export default PostList;