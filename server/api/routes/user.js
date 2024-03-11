import express from 'express';
const router = express.Router();
import { OTPVerification } from '../models/OTP.js';
const twofa = OTPVerification;
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
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
                        password: hashpass,
                        verified: false,
                        wishlsit: []
                });
                user.save().then(result=> {//verify acc
                    sendOTPEmail(result, res);
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
                sendOTPEmail({_id:user[0]._id, email:user[0].email}, res);
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

//set up mailing through outlook
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "bruinoutlet@gmail.com",
        pass: "vaer qjhk jfco nbwz "
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SMTP Success");
        console.log(success);
    }
})


const sendOTPEmail = async ({_id, email}, res) => {
    try {
        //create an OTP from 1000 to 9999
        const otp = `${Math.floor(Math.random() * 9000 + 1000)}`;

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Your One Time Password",
            html: `<p>Your one time password is: ${otp}</p>
            <p>This will expire in ten minutes.</p>`
        };

        //same security as our hashed passwords, salt 10 times
        const secureOtp = await bcrypt.hash(otp, 10);
        const newOTPVerification = await new twofa({
            userId: _id,
            otp: secureOtp,
            createdAt: Date.now(),
            //600000 ms = 10 mins
            expiresAt: Date.now() + 600000
        });
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
       console.log("OTP Email sent.");
    } catch (err) {
        console.log(err);
    }
}

router.post("/verifyOTP", async (req, res) => {
    try {

        let { userId, otp } = req.body;
        let userVerification;
        //make sure otp is entered
        if (!userId || !otp) {
            throw Error("Empty otp");
        } else {
            let user = await twofa.find({userId});
            userVerification = user;
        }
       
            if (userVerification.length > 0) {
            const { expiresAt } = userVerification[0];
            const secureOTP = userVerification[0].otp;
            
            //check that OTP has not expired
   
            if (expiresAt < Date.now()) {
                await userVerification.deleteMany({userId});
                throw new Error("Code has expired.")
            } else {
                console.log('here');
                //verify that the code is correct
                const correctOTP = await bcrypt.compare(otp, secureOTP)
                if (correctOTP) {

                    //set user to verified by searching w userid
                    User.updateOne({_id: userId}, {verified: true});
                    OTPVerification.deleteMany({ userId });
                    res.json({
                        message: "Verified!"
                    });
                } else {
                    throw new Error("Wrong OTP code.");
                }
            }
        } else {
            throw new Error(
                "Account doesn't exist or is already verified."
            )
        }
    } catch(err) {
        res.status(500).json({
            error: err,
            message: "Verification failed!"
        });
    }
});

const routerUser = router;
export { routerUser };