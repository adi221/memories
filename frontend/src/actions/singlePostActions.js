import axios from 'axios';
import {
  FETCH_SINGLE_POST_REQUEST,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
} from '../constants';

export const getSinglePost = id => async dispatch => {
  try {
    dispatch({ type: FETCH_SINGLE_POST_REQUEST });
    const { data } = await axios.get(`/posts/${id}`);
    dispatch({ type: FETCH_SINGLE_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_POST_FAIL, payload: error.message });
  }
};

export const updatePost = (id, updatedPost) => async dispatch => {
  try {
    dispatch({ type: EDIT_POST_REQUEST });
    const { data } = await axios.put(`/posts/${id}`, updatedPost);
    dispatch({ type: EDIT_POST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_POST_FAIL, payload: error.message });
  }
};
