import express from 'express';
import {signupController, signinController, signOutController, requireSignin} from '../controllers/auth.js';
const router = express.Router();

// validator
import {runValidaton} from '../validators/index.js'
import {userSignupValidator, userSigninValidator} from '../validators/auth.js';

router.post('/signup', userSignupValidator, runValidaton, signupController)
router.post('/signin', userSigninValidator, runValidaton, signinController)
router.get('/signout', signOutController)

// test 
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: "you have access to secret page"
    })
})

export default router


