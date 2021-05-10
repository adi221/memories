import React, { Component } from 'react';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username || '',
      email: this.props.email || '',
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    const {
      username,
      email,
      oldPassword,
      newPassword,
      newPasswordConfirm,
    } = this.state;
    if (!email || !username || !oldPassword) return;
    if (newPassword !== newPasswordConfirm) return;
    this.props.signup(username, email, oldPassword, newPassword);
  };

  render() {
    return (
      <>
        <form className='form-details' onSubmit={this.submitHandler}>
          <h2>{this.props.username}'s Details 👤</h2>

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
            name='oldPassword'
            placeholder='Old Password'
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <input
            type='password'
            name='newPassword'
            placeholder='New Password'
            value={this.state.password}
            onChange={this.inputHandler}
          />
          <input
            type='password'
            name='newPasswordConfirm'
            placeholder='Confirm New Password'
            value={this.state.confirmPassword}
            onChange={this.inputHandler}
          />
          <button type='submit' className='btn btn-auth'>
            Edit
          </button>
        </form>
      </>
    );
  }
}

export default UserDetails;
