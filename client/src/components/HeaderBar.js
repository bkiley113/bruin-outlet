import React from 'react'
import Logo from "../images/demologo.png"
import {Link} from 'react-router-dom'

const HeaderBar = () => {
    return (
        <div className='headerbar'>
            <div className='container'>
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=men">
                        <h6>MEN</h6>
                    </Link>
                    <Link className="link" to="/?cat=women">
                        <h6>WOMEN</h6>
                    </Link>
                    <Link className="link" to="/?cat=kids">
                        <h6>KIDS</h6>
                    </Link>
                    <Link className="link" to="/?cat=accessories">
                        <h6>ACCESSORIES</h6>
                    </Link>
                    <Link className="link" to="/?cat=about">
                        <h6>ABOUT</h6>
                    </Link>
                    <span>Account name </span>
                    <span>
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    </span>
                    <span className="cart">
                        <Link className="link" to="/cart">
                            <h5></h5>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar