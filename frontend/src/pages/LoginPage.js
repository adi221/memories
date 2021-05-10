import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogin } from '../actions/userActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    if (this.props.userLogin.user) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userLogin.user !== this.props.userLogin.user) {
      this.props.history.push('/');
    }
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) return;
    this.props.login(username, password);
  };

  render() {
    const { loading, error } = this.props.userLogin;

    return (
      <div className='login-page page'>
        <h2>Login 🗝</h2>
        <div className='underline'></div>
        <form className='form-auth' onSubmit={this.submitHandler}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={this.state.username}
            onChange={this.inputHandler}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <button type='submit' className='btn btn-auth'>
            Login
          </button>
          <Link to='/signup' className='auth-link'>
            Don't have an account? Sign up
          </Link>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(userLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
