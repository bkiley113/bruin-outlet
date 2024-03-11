import React from 'react'
import { Link } from 'react-router-dom'
import img from "C:/Users/tmdgj/UCLA/cs35L/project/web-app/client/src/images/demologo.png"


const Login = () => {
    return (
        <div className = 'authenticate'>
            <Link to='/'>
                <a >
                    <img className="loginlogo" src={img} />
                </a>
            </Link>
            <div className= "auth-container">
                <form>
                <h2>Login</h2>
                    <div className="form_g">
                        <label>Username</label>
                        <input type ="text" placeholder='username'/>
                    </div>
                    <div className="form_g">
                        <label>Password</label>
                        <input type ="password" placeholder='password'/>
                    </div>
                    
                    <p className="err-mess">Invalid username or password.</p>
                    <button>Login</button>
                    <span>Don't have an account yet?<br /><br /> 
                    <Link to="/makeaccount">Make one here.</Link>
                    </span>
                </form>
            </div>
            
        </div>
    )
}

export default Login;