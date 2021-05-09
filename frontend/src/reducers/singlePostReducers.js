import {
  FETCH_SINGLE_POST_REQUEST,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAIL,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAIL,
} from '../constants';

export const postDetailsReducer = (state = { post: { tags: [] } }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_POST_REQUEST:
      return { loading: true };
    case FETCH_SINGLE_POST_SUCCESS:
      return { post: action.payload, loading: false, success: true };
    case FETCH_SINGLE_POST_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const postEditReducer = (state = { post: { tags: [] } }, action) => {
  switch (action.type) {
    case EDIT_POST_REQUEST:
      return { loading: true };
    case EDIT_POST_SUCCESS:
      return { post: action.payload, loading: false, success: true };
    case EDIT_POST_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};
