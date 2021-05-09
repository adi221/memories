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

const rootReducer = combineReducers({
  posts: postsListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postDetails: postDetailsReducer,
  postEdit: postEditReducer,
});

export default rootReducer;
