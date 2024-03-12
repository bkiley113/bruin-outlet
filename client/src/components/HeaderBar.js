import React from 'react'
import Logo from "../images/demologo.png"
import {Link} from 'react-router-dom'
import Drop from './DropDown.js'
import { useAuth } from "./AuthContext.js"

const HeaderBar = () => {
    const { authToken, userEmail, userId, logout } = useAuth();

    const nameOnly = (email) => {
        return email.split('@')[0];
    };

    const nameClick = () => {
        const confirmLogout = window.confirm("Do you want to log out?");
        if (confirmLogout) {
            logout();
        }
    };


    React.useEffect(() => {
        console.log('JWT Token:', authToken);
        console.log('User Email:', userEmail);
        console.log('User ID:', userId);
    }, [authToken, userEmail, userId]); 

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
                    <Link className="link" to="/?cat=accessory">
                        <h6>ACCESSORIES</h6>
                    </Link>
                    <Link className="link" to="/?cat=technology">
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className="link" to="/?cat=stationery">
                        <h6>STATIONERY</h6>
                    </Link>
                    <Link className="link" to="/wishlist">
                        <span>WISHLIST</span>
                    </Link>
                    {authToken ? (
                        <span onClick={nameClick}>{nameOnly(userEmail)}</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
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