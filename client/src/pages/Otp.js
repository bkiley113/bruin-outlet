import React from 'react'
import { Link } from 'react-router-dom'
import img from "C:/Users/tmdgj/UCLA/cs35L/project/web-app/client/src/images/demologo.png"

const Otp = () => {
    return (
        <div className = 'authenticate'>
            <Link to='/'>
                <a >
                    <img className="loginlogo" src={img} />
                </a>
            </Link>            <h2></h2>
            <div className= "auth-container">
                <form>
                    <h2>OTP</h2>  
                    <div className='form_g_o'>
                        <input type ="text" placeholder='One Time Password'/>
                    </div>
                    
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Otp