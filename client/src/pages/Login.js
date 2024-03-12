import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.js';
import img from "../images/demologo.png"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null); // To store userId returned from the login
    const { login } = useAuth();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Please check your email for your one-time password.');
                setShowOtpInput(true); // Show OTP input
                setUserId(data.userId); // Store userId for OTP verification
            } else {
                alert(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Login error:', error);
            alert("An error occurred during login. Please try again.");
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/user/verifyOTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    otp,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('JWT:', data.token);
                login(data.token, email, userId);
                alert('Successful login');
                // Here you would typically navigate to another page or set global auth state
            } else {
                alert(data.message || "OTP verification failed. Please try again.");
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            alert("An error occurred during OTP verification. Please try again.");
        }
    };

    return (
        <div className='authenticate'>
            <Link to='/'>home</Link>
            <h1>Login</h1>
            <form onSubmit={showOtpInput ? handleOtpSubmit : handleLoginSubmit}>
                {!showOtpInput && (
                    <>
                        <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </>
                )}
                {showOtpInput && (
                    <>
                        <input type="text" placeholder='Enter your OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </>
                )}
                <button type="submit">{showOtpInput ? 'Verify OTP' : 'Login'}</button>
                <span>Don't have an account yet?<br /><br /> <Link to="/makeaccount">Make one here.</Link></span>
            </form>
        </div>
    );
};

export default Login;