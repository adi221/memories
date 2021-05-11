import { combineReducers } from 'redux';
import {
  postsListReducer,
  postCreateReducer,
  postDeleteReducer,
} from '../reducers/postsReducers';
import {
  postDetailsReducer,
  postEditReducer,
} from '../reducers/singlePostReducers';
import {
  userLoginReducer,
  userSignUpReducer,
  userDetailsReducer,
  userPostsReducer,
  userEditDetailsReducer,
} from '../reducers/userReducers';

const rootReducer = combineReducers({
  posts: postsListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postDetails: postDetailsReducer,
  postEdit: postEditReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
  userDetails: userDetailsReducer,
  userPosts: userPostsReducer,
  userEditDetails: userEditDetailsReducer,
});

export default rootReducer;
