import React from 'react'

const Login = () => {
    return (
        <div className = 'authenticate'>
            <h1>Login</h1>
            <form>
                <input type ="text" placeholder='username'/>
                <input type ="password" placeholder='password'/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login