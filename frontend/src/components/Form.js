import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileBase from 'react-file-base64';
import { createPost } from '../actions/postsActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creator: '',
      title: '',
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
    this.props.createPost({ ...this.state });
  };

  clearHandler = () => {
    this.setState({ creator: '', title: '', tags: '', selectedFile: '' });
  };

  render() {
    const { error, success } = this.props.postCreate;

    return (
      <form onSubmit={this.submitHandler}>
        <h3>Create a New Memory</h3>
        <input
          type='text'
          placeholder='Creator'
          name='creator'
          value={this.state.creator}
          onChange={this.inputHandler}
        />
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
        {/* <input
          type='file'
          onChange={this.fileHandler}
          accept='image/x-png,image/jpeg'
        /> */}
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
        {success && <h4>Successfully added</h4>}
        {error && <h4>{error}</h4>}
      </form>
    );
  }
}

const mapStateToProps = state => ({
  postCreate: state.postCreate,
});

const mapDispatchToProps = dispatch => ({
  createPost: post => dispatch(createPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
