import React from "react";
import { useState } from "react";
import {Link} from 'react-router-dom';
import "../styles/style.scss";

const DropdownMenu = () => {
    return (
        <div className="dropdownmenu">
          <ul>
            <Link className="link" to="/?cat=men"><li>MEN'S</li></Link>
            <Link className="link" to="/?cat=women"><li>WOMEN'S</li></Link>
            <Link className="link" to="/?cat=kids"><li>KID'S</li></Link>
          </ul>
        </div>
    );
  };

const Drop = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
      setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };
    return (
        <div className="dropdown">
        <header className="dropdownheader">
            <div
            className="dropdownmenu"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            >
            <h6>CLOTHING</h6>
            {/* <DropdownMenu /> */}
            {isDropdownVisible && <DropdownMenu />}
            </div>
        </header>
        </div>
    );
}
  
export default Drop;