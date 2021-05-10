import express from 'express';
const router = express.Router();
import { authUser, signUpUser } from '../controllers/userController.js';

router.route('/').post(signUpUser);
router.post('/login', authUser);

export default router;
