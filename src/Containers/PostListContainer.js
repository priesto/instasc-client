import React from 'react';
import PostList from '../Components/PostList';

import axios from '../Api';

class PostListContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            postModalVisible: false,
            activeAccount: this.props.match.params[0]
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.getPosts = this.getPosts.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    
    async componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params['0'] !== this.props.match.params['0']) {
            this.setState({activeAccount: this.props.match.params['0']});
        }
    }

    toggleModal() { this.setState({ postModalVisible: !this.state.postModalVisible}); }

    async getPosts() {
        try {
            const app_token = sessionStorage.getItem('app-token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

            const response = await axios.get('/posts');
            this.setState({posts: response.data});
        } catch (e) {
            console.error(e);
        }
    }
    
    updatePosts(post) {
        this.setState((prevState, props) => {
            return Object.assign({}, prevState, {posts: [...prevState.posts, post]});
        });
    }

    async deletePost(pid) {
        try {
            const app_token = sessionStorage.getItem('app-token');
            axios.defaults.headers.common['Authorization'] = `Bearer ${app_token}`;

            await axios.delete(`/posts/${pid}`);

            this.setState((prevState, props) => {
                return Object.assign({}, prevState, {posts: [...prevState.posts.filter(p => p.pid !== pid)]})
            })

        } catch (e) {
            console.error(e);
        }
    }

    render(){
        return (
            <PostList
                posts={this.state.posts}
                aid={this.state.activeAccount}
                postModalVisible={this.state.postModalVisible}
                toggleModal={this.toggleModal}
                updatePosts={this.updatePosts}
                deletePost={this.deletePost}
                getPosts={this.getPosts}
            />
        )
    }

}

export default PostListContainer;