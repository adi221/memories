import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { AiFillLike, AiFillDelete, AiFillDislike } from 'react-icons/ai';
import { deletePost, likePost } from '../actions/postsActions';

class Post extends Component {
  render() {
    const {
      username,
      numLikes,
      message,
      selectedFile,
      tags,
      title,
      _id,
      createdAt,
      likes,
      user,
    } = this.props.post;

    let userId, doesUserLike, doesUserOwnsPost;
    if (this.props.userInfo) {
      userId = this.props.userInfo._id;
      doesUserLike = likes.find(like => like.user.toString() === userId);
      doesUserOwnsPost = user === userId;
    }

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
            {userId && (
              <button
                className='like'
                onClick={() => {
                  this.props.likePost(_id);
                }}
              >
                {doesUserLike ? (
                  <AiFillDislike style={{ color: 'red' }} />
                ) : (
                  <AiFillLike />
                )}
                ({numLikes} Likes)
              </button>
            )}
            {doesUserOwnsPost && (
              <button
                className='del'
                onClick={() => this.props.deletePost(_id)}
              >
                <AiFillDelete /> Delete{' '}
              </button>
            )}
          </footer>
        </div>
      </article>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userLogin.user,
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  likePost: id => dispatch(likePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
