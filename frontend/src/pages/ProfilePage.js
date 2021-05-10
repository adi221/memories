import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserDetails from '../components/UserDetails';
import Posts from '../components/Posts';
import Loader from '../components/Loader';
import { getUserDetails, getUserPosts } from '../actions/userActions';

class ProfilePage extends Component {
  componentDidMount() {
    if (!this.props?.userInfo?._id) {
      this.props.history.push('/');
      return;
    }
    this.props.getUserDetails(this.props.userInfo._id);
    this.props.getUserPosts(this.props.userInfo._id);
  }

  render() {
    if (this.props.userDetails.loading || this.props.userPosts.loading)
      return <Loader />;

    return (
      <div className='profile-page page'>
        <div className='profile-page-container'>
          <Posts
            posts={this.props.userPosts}
            title={
              this.props.userDetails.details &&
              `${this.props.userDetails.details.username}'s Posts`
            }
          />
          <UserDetails
            username={
              this.props.userDetails.details &&
              this.props.userDetails.details.username
            }
            email={
              this.props.userDetails.details &&
              this.props.userDetails.details.email
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userLogin.user,
  userDetails: state.userDetails,
  userPosts: state.userPosts,
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: id => dispatch(getUserDetails(id)),
  getUserPosts: id => dispatch(getUserPosts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
