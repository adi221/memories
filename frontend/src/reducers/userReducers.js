import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  EDIT_USER_DETAILS_REQUEST,
  EDIT_USER_DETAILS_SUCCESS,
  EDIT_USER_DETAILS_FAIL,
  EDIT_USER_DETAILS_RESET,
} from '../constants';

const userInfoFromStorage = localStorage.getItem('userInfoMemories')
  ? JSON.parse(localStorage.getItem('userInfoMemories'))
  : null;

export const userLoginReducer = (
  state = { user: userInfoFromStorage },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, details: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_USER_POSTS_REQUEST:
      return { loading: true };
    case GET_USER_POSTS_SUCCESS:
      return { loading: false, posts: action.payload };
    case GET_USER_POSTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userEditDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER_DETAILS_REQUEST:
      return { loading: true };
    case EDIT_USER_DETAILS_SUCCESS:
      return { loading: false, success: true };
    case EDIT_USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
