import React, { useState } from 'react'
import Logo from "../images/demologo.png"
import {Link} from 'react-router-dom'
import Drop from './DropDown.js'
import { useAuth } from "./AuthContext.js"

const HeaderBar = () => {
    const { authToken, userId, logout } = useAuth();
    const [isHovering, setIsHovering] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [uEmail, setUEmail] = useState('');

    const verifyUser = (userId, authToken) => {
        const url = new URL(`http://localhost:3001/user/verify?userId=${userId}`);
    
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok. The user is may not be logged in.');
            }
            return response.json();
        })
        .then((data) => {
            if (data._id) {
                setLoggedIn(true);
                setUEmail(data.email);
            } else {
                setLoggedIn(false);
            }
        })
        .catch((error) => {
            console.error('There was an issue verifying the user:', error);
            setLoggedIn(false);
        });
    };

    React.useEffect(() => {
        verifyUser(userId, authToken);
    }, []);


    const nameOnly = (email) => {
        return email.split('@')[0];
    };

    const nameClick = () => {
        const confirmLogout = window.confirm("Do you want to log out?");
        if (confirmLogout) {
            logout();
        }
    };


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
                        <div className="acct"><h4>Wishlist</h4></div>
                    </Link>
                    {loggedIn ? (
                        <div className="acct" 
                        onMouseEnter={() => setIsHovering(true)} 
                        onMouseLeave={() => setIsHovering(false)} 
                        onClick={nameClick}
                        style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
                       {/* User email and the name are gonna be shown when not hovering over it */}
                       <h4 style={{ 
                           visibility: isHovering ? 'hidden' : 'visible',
                           position: 'relative',
                           top: 0, 
                           left: 0,
                           width: '100%',
                           textAlign: 'center'
                       }}>
                           {nameOnly(uEmail)}
                       </h4>
                       {/* LOGOUT? is gonna be shown if hoveering */}
                       <h4 style={{ 
                           visibility: isHovering ? 'visible' : 'hidden',
                           position: 'absolute',
                           top: 0, 
                           left: 0,
                           width: '100%',
                           textAlign: 'center'
                       }}>
                           LOGOUT?
                       </h4>
                   </div>
                    ) : (
                        <Link className="link" to="/login">
                            <div className="acct"><h4>Login</h4></div>
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