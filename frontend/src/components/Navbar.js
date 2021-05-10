import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { userLogout } from '../actions/userActions';

class Navbar extends Component {
  logOutHandler = () => {
    this.props.logout();
  };

  render() {
    return (
      <nav>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <h1>Memories📝📝</h1>
            </Link>
            <button>
              <FaBars />
            </button>
          </div>
          {this.props.user ? (
            <div className='nav-auth'>
              <Link to='/profile'>Profile</Link>
              <button onClick={this.logOutHandler}>Log out</button>
            </div>
          ) : (
            <div className='nav-auth'>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userLogin.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
