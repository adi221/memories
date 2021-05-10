import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userSignUp } from '../actions/userActions';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentDidMount() {
    if (this.props.userSignUp.user) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userSignUp.user !== this.props.userSignUp.user) {
      this.props.history.push('/');
    }
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = this.state;
    if (!email || !username || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;
    this.props.signup(username, email, password);
  };

  render() {
    const { error, loading } = this.props.userSignUp;

    return (
      <div className='login-page page'>
        <h2>Signup 🗝</h2>
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
            type='email'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.inputHandler}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={this.state.confirmPassword}
            onChange={this.inputHandler}
          />
          <button type='submit' className='btn btn-auth'>
            Login
          </button>
          <Link to='/login' className='auth-link'>
            Have an account ? Login
          </Link>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userSignUp: state.userSignUp,
});

const mapDispatchToProps = dispatch => ({
  signup: (username, email, password) =>
    dispatch(userSignUp(username, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
