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
    /*request format:
    {
        email: testemail@123.com,
        password: pass123
    }*/
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length > 0) {
            return res.status(409).json({message:'Email already registered!'});
        }
        else {
            //encrypt the password and salt it 10 times
            userId = new mongoose.Types.ObjectId();
            bcrypt.hash(req.body.password, 10, (err, hashpass) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: userId,
                        email: req.body.email,
                        password: hashpass,
                        wishlist: []
                });
                user.save().then(result=> {
                    res.status(201).json({
                        message: 'User created!',
                        id: userId
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
                //send one time password
                sendOTPEmail({id:user[0]._id, email:user[0].email}, res);
                //return status 200, frontend should check this then call /verifyotp
                return res.status(200).json({
                    message: 'Auth successful!',
                    userId: user[0]._id
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


const sendOTPEmail = async ({id, email}, res) => {
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
            _id: new mongoose.Types.ObjectId(),
            userId: id,
            otp: secureOtp,
            createdAt: Date.now(),
            //600000 ms = 10 mins
            expiresAt: Date.now() + 600000
        });
        let existingOTP = await twofa.find({userId: id});
        if (existingOTP.length > 0)
            await twofa.deleteMany({userId: id});
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
       console.log("OTP Email sent.");
    } catch (err) {
        console.log(err);
    }
}

router.post("/verifyOTP", async (req, res) => {
    /*Reqeust format:
    {
        userId: 3231a..
        otp: 1111
    }*/
    try {
        let userId = req.body.userId;
        let otp = req.body.otp;
        let userVerification;
        //make sure otp is entered
        if (!userId || !otp) {
            throw Error("Empty otp");
        } else {
            let user = await twofa.find({userId});
            userVerification = user;
        }
            if (userVerification.length > 0) {
            const expiresAt = userVerification[0].expiresAt;
            const secureOTP = userVerification[0].otp;
            console.log(secureOTP);
            console.log(otp);
            //check that OTP has not expired
            if (expiresAt < Date.now()) {
                console.log("test");
                await userVerification.deleteMany({userId});
                throw new Error("Code has expired.")
            } else {
                console.log('here');
                //verify that the code is correct
                const correctOTP = await bcrypt.compare(otp, secureOTP)
                console.log(correctOTP);
                if (correctOTP) {
                    //set user to verified by searching w userid
                    const user = await User.find({_id: req.body.userId});
                    const userToken = jwt.sign({
                        email: user[0].email,
                        userId: user[0].id
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    OTPVerification.deleteMany({ userId });
                    res.json({
                        message: "Verified!",
                        token: userToken
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
//get all wishlist items
router.get('/wishlist', (req, res, next) => {
    //req format: "userId: _id"
    let userId = req.body._id;
    User.findOne({_id: userId}).exec().then(user => {
        const wishlist = user.wishlist;
        res.status(200).json({
            _id: userId,
            wishlist
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

//add a wishlist item
router.post('/wishlist', (req, res, next) =>{
    //req format: {
    //"uid": "user id"
    //"pid": "product id" }
    let userId = req.body.uid;
    let productId = req.body.pid;
    User.updateOne({_id: userId}, {$push: { wishlist: productId}}).exec().then(result => {
        res.status(201).json({
            ProductID: productId,
            message: "Product added to wishlist"
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
})

//delete a wishlist item
router.delete('/wishlist', (req, res, next) =>{
    //req format: {
    //"uid": "user id"
    //"pid": "product id" }
    let userId = req.body.uid;
    let productId = req.body.pid;
    User.updateOne({_id: userId}, {$pull: { wishlist: productId}}).exec().then(result => {
        if (result.modifiedCount === 0) {
            res.status(404).json({
                message: `Product ID ${productId} is not in wishlist!`
            })
        } else {
        res.status(200).json({
            message: `Product ID ${productId} removed from wishlist.`
        })};
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
})

const routerUser = router;
export { routerUser };