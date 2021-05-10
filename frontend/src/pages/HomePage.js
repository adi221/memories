import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Posts from '../components/Posts';
import { getPosts } from '../actions/postsActions';

class HomePage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <main className='page'>
        <div className='home-container'>
          <Posts title='All Posts' posts={this.props.posts} />
          <Form />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
