import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from "../images/demologo.png"; // Make sure to import the image

const MakeAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
                alert('Success! You are registered. Please login now.')
                navigate('/login');
            } else if (response.status === 409) {
                alert('Email already registered.');
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
        }
    };
    useEffect(() => {
        document.title = 'Get registered!';
    })

    return (
        <div className='authenticate'>
            <Link to='/'>
                    <img className="loginlogo" src={img} />
            </Link>
            <div className="auth-container">
                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <div className="form_g_r">
                        <label>Email</label>
                        <input 
                            type="email" 
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {/* Username field is omitted since it's not used in your handleSubmit */}
                    <div className="form_g_r">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Register</button>
                    <span>Already have an account?<br /><br /> <Link to="/login">Log in here.</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default MakeAccount;
