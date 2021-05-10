import {
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_FAIL,
  ADD_NEW_POST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
} from '../constants';

export const postsListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return { loading: true };
    case FETCH_ALL_SUCCESS:
      return { posts: action.payload, loading: false, success: true };
    case FETCH_ALL_FAIL:
      return { error: action.payload, loading: false };
    case ADD_NEW_POST:
      return { posts: [...state.posts, action.payload] };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { loading: true };
    case CREATE_POST_SUCCESS:
      return { success: true, loading: false };
    case CREATE_POST_FAIL:
      return { error: action.payload, loading: false };
    case CREATE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return { success: true, loading: false };
    case DELETE_POST_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return { success: true, loading: false };
    case LIKE_POST_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
