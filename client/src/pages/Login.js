import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className = 'authenticate'>
            <h1>Login</h1>
            <form>
                <input type ="text" placeholder='username'/>
                <input type ="password" placeholder='password'/>
                <p class="pass-reqs">Password must be at least 8 characters long</p>
                <button>Login</button>
                <span>Don't have an account yet?<br /><br /> <Link to="/makeaccount">Make one here.</Link>
                </span>
            </form>
        </div>
    )
}

export default Login