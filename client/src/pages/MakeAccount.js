import React from 'react'
import { Link } from 'react-router-dom'
import img from "C:/Users/tmdgj/UCLA/cs35L/project/web-app/client/src/images/demologo.png"

const MakeAccount = () => {
    return (
        <div className = 'authenticate'>
            <Link to='/'>
                <a >
                    <img className="loginlogo" src={img} />
                </a>
            </Link>
            <div className= "auth-container">
                <form>
                    <h2>Register</h2>
                        <div className="form_g_r">
                            <label>Email</label>
                            <input type="email" placeholder='email'/>
                        </div>
                        <div className="form_g_r">
                            <label>Username</label>
                            <input type ="text" placeholder='username'/>
                            
                        </div>
                        <div className="form_g_r">
                            <label>Password</label>
                            <input type ="password" placeholder='password'/>
                            </div>
                        <p class="pass-reqs">Password must be at least 8 characters long and<br />
                        must contain at least one special character.</p>
                        <button>Register</button>
                        <span>Already have an account?<br /><br /> <Link to="/login">Log in here.</Link>
                        </span>
                </form>
            </div>
            
        </div>
    )
}

export default MakeAccount