import express from 'express';
import {signupController} from '../controllers/auth.js';
const router = express.Router();

// validator
import {runValidaton} from '../validators/index.js'
import {userSignupValidator} from '../validators/auth.js';

router.post('/signup', userSignupValidator, runValidaton, signupController)


export default router


