import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { CREATE_POST_RESET } from '../constants';
import { createPost } from '../actions/postsActions';
import { updatePost } from '../actions/singlePostActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    };
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileHandler = file => {
    this.setState({ selectedFile: file.base64 });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.props.edit) {
      this.props.updatePost(this.props.id, {
        ...this.state,
        user: this.props.userInfo._id,
        username: this.props.userInfo.username,
      });
    } else {
      this.props.createPost({
        ...this.state,
        user: this.props.userInfo._id,
        username: this.props.userInfo.username,
      });
    }
    this.clearHandler();
    setTimeout(() => this.props.resetForm(), 2000);
  };

  clearHandler = () => {
    this.setState({
      title: '',
      tags: '',
      message: '',
      selectedFile: '',
    });
  };

  render() {
    const { error, success } = this.props.postCreate;
    const { errorEdit, successEdit } = this.props.postEdit;

    if (!this.props.userInfo)
      return (
        <Link to='/login' className='alert-box'>
          <h4>Login so you can upload new posts</h4>
        </Link>
      );

    return (
      <form onSubmit={this.submitHandler} className='form-memory'>
        <h3>{this.props.title}</h3>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={this.state.title}
          onChange={this.inputHandler}
        />
        <textarea
          type='text'
          placeholder='Message'
          name='message'
          value={this.state.message}
          onChange={this.inputHandler}
        />
        <input
          type='text'
          placeholder='Tags (Comma separated)'
          name='tags'
          value={this.state.tags}
          onChange={this.inputHandler}
        />
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) => this.fileHandler({ base64 })}
          accept='image/x-png,image/jpeg'
        />
        <button type='submit' className='submit-btn btn'>
          Submit
        </button>
        <button
          type='button'
          className='clear-btn btn'
          onClick={this.clearHandler}
        >
          Clear
        </button>
        {(success || successEdit) && <h4>Successfully added</h4>}
        {(error || errorEdit) && <h4>{error}</h4>}
      </form>
    );
  }
}

Form.defaultProps = {
  title: 'Create a New Memory',
  edit: false,
};

const mapStateToProps = state => ({
  postCreate: state.postCreate,
  postEdit: state.postEdit,
  userInfo: state.userLogin.user,
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post)),
  resetForm: () => dispatch({ type: CREATE_POST_RESET }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
