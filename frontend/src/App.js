import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from './components/Form';
import Posts from './components/Posts';
import { getPosts } from './actions/postsActions';

class App extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    return (
      <main>
        <h2>Memories📝📝</h2>
        <div className='underline'></div>
        <div className='app-container'>
          <Posts />
          <Form />
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch(getPosts()),
});

export default connect(null, mapDispatchToProps)(App);
