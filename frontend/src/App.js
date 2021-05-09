import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact component={HomePage} />
        <Route path='/posts/:id' exact component={SinglePostPage} />
      </Router>
    );
  }
}

export default App;
