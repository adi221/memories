import axios from 'axios';
import {
  FETCH_ALL_REQUEST,
  FETCH_ALL_SUCCESS,
  FETCH_ALL_FAIL,
  ADD_NEW_POST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
} from '../constants';

export const getPosts = () => async dispatch => {
  try {
    dispatch({ type: FETCH_ALL_REQUEST });
    const { data } = await axios.get('/posts');
    dispatch({ type: FETCH_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ALL_FAIL, payload: error.message });
  }
};

export const createPost = newPost => async dispatch => {
  try {
    dispatch({ type: CREATE_POST_REQUEST });
    const { data } = await axios.post('/posts', newPost);
    dispatch({ type: CREATE_POST_SUCCESS });
    dispatch({ type: ADD_NEW_POST, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_POST_FAIL, payload: error.message });
  }
};

export const deletePost = id => async dispatch => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });
    await axios.delete(`/posts/${id}`);
    dispatch({ type: DELETE_POST_SUCCESS });
    getPosts();
  } catch (error) {
    dispatch({ type: DELETE_POST_FAIL, payload: error.message });
  }
};

export const likePost = id => async dispatch => {
  try {
    dispatch({ type: LIKE_POST_REQUEST });
    await axios.put(`/posts/like/${id}`);
    dispatch({ type: LIKE_POST_SUCCESS });
    getPosts();
  } catch (error) {
    dispatch({ type: LIKE_POST_FAIL, payload: error.message });
  }
};
