import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OTPVerificationSchema = new Schema({
    userId: {type: String, required: true},
    otp: {type: String, required: true},
    createdAt: Date,
    expiresAt: {type: Date, required: true}
});

const OTPVerification = mongoose.model(
    "OTPVerification", OTPVerificationSchema
);

export { OTPVerification };