import React from 'react'
import Logo from "../images/demologo.png"

const HeaderBar = () => {
    return (
        <div className='headerbar'>
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="links">links</div>
            </div>
        </div>
    )
}

export default HeaderBar