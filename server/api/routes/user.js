import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

import { userModel } from '../models/user.js';
const User = userModel;

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length > 0) {
            return res.status(409).json({message:'Email already registered!'});
        }
        else {
            //encrypt the password and salt it 10 times
            bcrypt.hash(req.body.password, 10, (err, hashpass) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hashpass
                });
                user.save().then(result=> {
                    res.status(201).json({
                        message: 'User created!'
                    })
                }).catch(err=> {
                    res.status(500).json({error: err});
                })
    }});
        }
    })
    });

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).exec().then(user => {
        //check that email exists
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Login failed.'
            });
        }
        //compare password with stored hash to validate
        bcrypt.compare(req.body.password, user[0].password, (err, doesMatch) => {
            if (err) {
                return res.status(401).json({
                    message: 'Login failed.'
                });
            }
            if (doesMatch) {
                const userToken = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successful!',
                    token: userToken
                });
            }
            //if no error but no match, 
            else {return res.status(401).json({
                message: 'Login failed.'
            }); }
        })
    }).catch(err => {
        res.status(500).json({error: err});
    });
})

const routerUser = router;
export { routerUser };