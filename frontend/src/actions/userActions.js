import axios from 'axios';
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
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  EDIT_USER_DETAILS_REQUEST,
  EDIT_USER_DETAILS_SUCCESS,
  EDIT_USER_DETAILS_FAIL,
} from '../constants';

export const userLogin = (username, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/users/login',
      { username, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfoMemories', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};

export const userSignUp = (username, email, password) => async dispatch => {
  try {
    dispatch({ type: USER_SIGNUP_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/users',
      { username, email, password },
      config
    );
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem('userInfoMemories', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_SIGNUP_FAIL, payload: error.message });
  }
};

export const userLogout = () => dispatch => {
  localStorage.removeItem('userInfoMemories');
  dispatch({ type: USER_LOGOUT });
};

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/users/${id}`, {}, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.message });
  }
};

export const getUserPosts = id => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_POSTS_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/posts/user/${id}`, config);
    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_POSTS_FAIL, payload: error.message });
  }
};

export const editUserDetails = userDetails => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_USER_DETAILS_REQUEST });

    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(`/users/profile`, userDetails, config);
    dispatch({ type: EDIT_USER_DETAILS_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EDIT_USER_DETAILS_FAIL, payload: error.message });
  }
};
