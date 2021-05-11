import express from 'express';
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  getSinglePost,
  updatePost,
  getUserPosts,
} from '../controllers/postsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').delete(deletePost).get(getSinglePost).put(updatePost);
router.route('/like/:id').put(protect, likePost);
router.route('/user/:id').get(getUserPosts);

export default router;
