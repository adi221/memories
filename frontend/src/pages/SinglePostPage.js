import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../components/Loader';
import Form from '../components/Form';
import { getSinglePost } from '../actions/singlePostActions';

class SinglePostPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   //   if(nextProps.someValue!==prevState.someValue){
  //   //     return { someState: nextProps.someValue};
  //   //  }
  //   console.log(nextProps, prevState);
  //   return null;
  // }

  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getSinglePost(this.props.match.params.id);
    }
  }

  render() {
    const { post, loading } = this.props.postDetails;
    if (loading) return <Loader />;
    const {
      tags,
      likeCount,
      createdAt,
      username,
      title,
      selectedFile,
      message,
    } = post;
    return (
      <div className='single-post-page page'>
        <img src={selectedFile} alt={title} />
        <div className='single-post-content'>
          <Link to='/' className='go-back-btn'>
            Go Back
          </Link>
          <h1 className='single-post-title'>{title}</h1>

          <div className='single-post-line'>
            Tags:
            <p>
              {tags.length > 0 &&
                tags
                  .split(',')
                  .map((tag, index) => <span key={index}>#{tag.trim()}</span>)}
            </p>
          </div>
          <p className='single-post-line'>
            Created by: <span>{username}</span>
          </p>
          <p className='single-post-line'>
            Created at: <span>{createdAt && createdAt.substring(0, 10)}</span>
          </p>
          <p className='single-post-line'>
            Number of likes: <span>{likeCount}</span>
          </p>
          <p className='single-post-line'>
            Content: <span>{message}</span>
          </p>
          {this.props.postDetails.post.user === this.props.userInfo._id && (
            <button
              className='edit-btn'
              onClick={() => this.setState({ showForm: !this.state.showForm })}
            >
              {this.state.showForm ? 'Close' : 'Edit'}
            </button>
          )}

          {this.state.showForm && (
            <Form title='Edit a memory' id={this.props.match.params.id} edit />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  postDetails: state.postDetails,
  userInfo: state.userLogin.user,
});

const mapDispatchToProps = dispatch => ({
  getSinglePost: id => dispatch(getSinglePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostPage);
