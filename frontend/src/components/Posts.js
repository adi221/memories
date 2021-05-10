import React, { Component } from 'react';
import Loader from './Loader';
import PostPreview from './PostPreview';

class Posts extends Component {
  render() {
    const { posts = [], loading, error } = this.props.posts;

    if (!posts.length && !loading) {
      return <div className='alert-box'>No posts yet</div>;
    }

    return (
      <div className='posts'>
        {loading && <Loader />}
        <h2>{this.props.title}📝📝</h2>
        <div className='underline'></div>
        {error && <h4>{error}</h4>}
        <div className='posts-container'>
          {posts.map(post => {
            return <PostPreview key={post._id} post={post} />;
          })}
        </div>
      </div>
    );
  }
}

export default Posts;
