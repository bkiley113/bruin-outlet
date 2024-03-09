import React from 'react'
import Logo from "../images/demologo.png"
import {Link} from 'react-router-dom'
import Drop from './DropDown.js'

const HeaderBar = () => {
    return (
        <div className='headerbar'>
            <div className='container'>
                <Link className="link" to ="/">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                </Link>
                <div className="links">
                    <Link className="link" to="/?cat=clothes">
                        <h6 className="drop6"><Drop /></h6>
                    </Link>
                    <Link className="link" to="/?cat=accessories">
                        <h6>ACCESSORIES</h6>
                    </Link>
                    <Link className="link" to="/?cat=about">
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className="link" to="/?cat=about">
                        <h6>STATIONERY</h6>
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