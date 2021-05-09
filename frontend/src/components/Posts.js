import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';
import Post from './Post';

class Posts extends Component {
  render() {
    const { posts = [], loading, error } = this.props.posts;

    return (
      <div className='posts'>
        <h3>Posts</h3>
        {loading && <Loader />}
        {error && <h4>{error}</h4>}
        {posts.map(post => {
          return <Post key={post._id} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(Posts);
