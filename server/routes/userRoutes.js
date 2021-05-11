import express from 'express';
const router = express.Router();
import {
  authUser,
  signUpUser,
  getUserDetails,
  editUserDetails,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(signUpUser);
router.post('/login', authUser);
router.route('/profile').put(protect, editUserDetails);
router.route('/:id').get(getUserDetails);

export default router;
