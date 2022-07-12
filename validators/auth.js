import {check} from 'express-validator';
// import {body} from 'express-validator';


export const userSignupValidator = [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Must be a valid E-mail adress'),
    check('password').isLength({min: 6}).withMessage('Password must be 6 characters long'),
]








