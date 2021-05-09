import { combineReducers } from 'redux';
import {
  postsListReducer,
  postCreateReducer,
  postDetailsReducer,
} from '../reducers/postsReducers';

const rootReducer = combineReducers({
  posts: postsListReducer,
  postCreate: postCreateReducer,
  postDetails: postDetailsReducer,
});

export default rootReducer;
