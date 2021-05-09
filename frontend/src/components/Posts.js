import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import PostPreview from './PostPreview';

class Posts extends Component {
  render() {
    const { posts = [], loading, error } = this.props.posts;

    return (
      <div className='posts'>
        {loading && <Loader />}
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

const mapStateToProps = state => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
