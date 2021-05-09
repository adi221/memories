import express from 'express';
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  getSinglePost,
  updatePost,
} from '../controllers/posts.js';

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').delete(deletePost).get(getSinglePost).put(updatePost);
router.route('/like/:id').put(likePost);

export default router;
