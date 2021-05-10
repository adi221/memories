import express from 'express';
const router = express.Router();
import {
  authUser,
  signUpUser,
  getUserDetails,
} from '../controllers/userController.js';

router.route('/').post(signUpUser);
router.post('/login', authUser);
router.route('/:id').get(getUserDetails);

export default router;
