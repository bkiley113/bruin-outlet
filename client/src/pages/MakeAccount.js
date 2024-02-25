import React from 'react'
import { Link } from 'react-router-dom'

const MakeAccount = () => {
    return (
        <div className = 'authenticate'>
            <h1>Register Your Account</h1>
            <form>
                <input type="email" placeholder='email'/>
                <input type ="text" placeholder='username'/>
                <input type ="password" placeholder='password'/>
                <p class="pass-reqs">Password must be at least 8 characters long and<br /><br />
                must contain at least one special character.</p>
                <button>Register</button>
                <span>Already have an account?<br /><br /> <Link to="/login">Log in here.</Link>
                </span>
            </form>
        </div>
    )
}

export default MakeAccount