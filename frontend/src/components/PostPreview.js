import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { AiFillLike, AiFillDelete } from 'react-icons/ai';
import { deletePost, likePost } from '../actions/postsActions';

class Post extends Component {
  render() {
    const {
      username,
      likeCount,
      message,
      selectedFile,
      tags,
      title,
      _id,
      createdAt,
    } = this.props.post;

    return (
      <article className='post-preview'>
        <div className='post-preview-creator'>{username}</div>
        <div className='post-preview-created-at'>
          {moment(createdAt).fromNow()}
        </div>
        <img src={selectedFile} alt={title} />
        <div className='content'>
          <div className='content-tags'>
            {tags.split(',').map((tag, index) => (
              <span key={index}>#{tag.trim()}</span>
            ))}
          </div>
          <Link to={`/posts/${_id}`}>
            <h3 className='content-title'>
              {title.length > 30 ? title.substring(0, 28) + '...' : title}
            </h3>
            <p className='content-message'>{message}</p>
          </Link>
          <footer className='content-footer'>
            <button className='like' onClick={() => this.props.likePost(_id)}>
              <AiFillLike /> Like {likeCount}
            </button>
            <button className='del' onClick={() => this.props.deletePost(_id)}>
              <AiFillDelete /> Delete{' '}
            </button>
          </footer>
        </div>
      </article>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  likePost: id => dispatch(likePost(id)),
});

export default connect(null, mapDispatchToProps)(Post);
