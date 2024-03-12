import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.js';
import img from "../images/demologo.png";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!showOtpInput) {
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
                    setShowOtpInput(true);
                    setUserId(data.userId);
                } else {
                    setErrorMessage(data.message || "Login failed. Please try again.");
                }
            } catch (error) {
                console.error('Login error:', error);
                setErrorMessage("An error occurred during login. Please try again.");
            }
        } else {
            handleOtpSubmit(e);
        }
    };

    const handleOtpSubmit = async (e) => {
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
                alert('Successful login, redirecting you to the home page!');
                navigate('/');
            } else {
                setErrorMessage(data.message || "OTP verification failed. Please try again.");
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            setErrorMessage("An error occurred during OTP verification. Please try again.");
        }
    };

    return (
        <div className='authenticate'>
            <Link to='/'>
                <a>
                    <img className="loginlogo" src={img} />
                </a>
            </Link>
            <div className="auth-container">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
                    {!showOtpInput && (
                        <>
                            <div className="form_g">
                                <label>Email</label>
                                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form_g">
                                <label>Password</label>
                                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </>
                    )}
                    {showOtpInput && (
                        <div className="form_g">
                            <label>Enter your OTP</label>
                            <input type="text" placeholder='OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                    )}
                    {errorMessage && <p className="err-mess">{errorMessage}</p>}
                    <button type="submit">{showOtpInput ? 'Verify OTP' : 'Login'}</button>
                    <span>Don't have an account yet?<br /><br /> 
                    <Link to="/makeaccount">Make one here.</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
