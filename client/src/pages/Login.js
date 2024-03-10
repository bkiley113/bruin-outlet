import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className = 'authenticate'>
            <Link to='/'><div className='bar'>Bar goes here, should be able to get back to homepage</div></Link>
            <h2></h2>
            <h1>Login</h1>
            <form>
                <input type ="text" placeholder='username'/>
                <input type ="password" placeholder='password'/>
                <p className="err-mess">Invalid username or password.</p>
                <button>Login</button>
                <span>Don't have an account yet?<br /><br /> <Link to="/makeaccount">Make one here.</Link>
                </span>
            </form>
        </div>
    )
}

export default Login