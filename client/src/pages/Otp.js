import React from 'react'
import { Link } from 'react-router-dom'

const Otp = () => {
    return (
        <div className = 'authenticate'>
            <Link to='/'><div className='bar'>Bar goes here, should be able to get back to homepage</div></Link>
            <h2></h2>
            <h1>One Time Password</h1>
            <form>
                <input type ="text" placeholder='OTP'/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Otp