import User from '../models/user.js';
import shortId from 'shortid';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import user from '../models/user.js';

export const signupController = (req, res) => {
    console.log(`${process.env.JWT_SECRET}`);
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "Email is taken"
            })
        }

        const {name, email, password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name, email, password, profile, username})
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({error: err})
            }

            res.json({
                user: success
            })

            // res.json({
            //     message: "Signup success ! Please sign in."
            // })
        })
    })
    // const {name, email, password} = req.body

    // res.json({
    //     user: {name, email, password}
    // })
}
export const signinController = (req, res) => {
    
    const {email, password} = req.body
    
    // check if user exist
    User.findOne({email}).exec((err, user) => {
        if (err || !user) return res.status(400).json({error: "User with this e-mail doesn't exist, please sign up"})
        
        // authenticate
        if (!user.authenticate(password)) return res.status(400).json({error: "E-mail and password don't match"})

        // generate a token and send to client
    
        const token = jwt.sign({_id: user._id}, `${process.env.JWT_SECRET}`, {expiresIn: '1d'})

        res.cookie('token', token, {expiresIn: '1d'})

        const {_id, username, name, email, role} = user

        return res.json({
            token,
            user: {_id, username, name, email, role}
        })
    })

}

export const signOutController = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Signout success"
    })
}

export const requireSignin = expressjwt({
    secret: `${process.env.JWT_SECRET}`,
    algorithms: ['HS256'],
})