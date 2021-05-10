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
import { userLoginReducer, userSignUpReducer } from '../reducers/userReducers';

const rootReducer = combineReducers({
  posts: postsListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postDetails: postDetailsReducer,
  postEdit: postEditReducer,
  userLogin: userLoginReducer,
  userSignUp: userSignUpReducer,
});

export default rootReducer;
