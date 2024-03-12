import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MakeAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // For redirecting to /login

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (response.status === 201) {
                // Success: Redirect to login page
                navigate('/login');
            } else if (response.status === 409) {
                // Email already registered
                alert('Email already registered.');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='authenticate'>
            <Link to='/'><div className='bar'>Bar goes here, should be able to get back to homepage</div></Link>
            <h1>Register Your Account</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* Removed the username field since it's not used in the POST request */}
                <input
                    type="password"
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <span>Already have an account?<br /><br /> <Link to="/login">Log in here.</Link>
                </span>
            </form>
        </div>
    );
};

export default MakeAccount;