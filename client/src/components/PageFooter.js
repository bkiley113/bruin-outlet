import React from 'react';
import logo from '../images/demologo.png';
import { ReactComponent as FacebookIcon } from '../images/facebook.svg';
import { ReactComponent as InstagramIcon } from '../images/instagram.svg';
import { ReactComponent as TwitterIcon } from '../images/twitter.svg';

const PageFooter = () => {
    return (
        <footer className="page-footer">
            <div className="footer-logo">
                <img src={logo} alt="UCLA Outlet Logo" />
            </div>
            <div className="footer-about">
                <h3>About UCLA Outlet</h3>
                <p>Great products, for cheap. Dedicated to providing quality merchandise at affordable prices.</p>
            </div>
            <div className="footer-social">
                <h3>Connect With Us</h3>
                <div className="social-icons">
                    <FacebookIcon />
                    <InstagramIcon />
                    <TwitterIcon />
                </div>
            </div>
            <div className="footer-nav">
                <h3>Navigation</h3>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Products</li>
                    <li>Contact Us</li>
                </ul>
            </div>
            <div className="footer-thanks">
                <span>Thank you for visiting!</span>
                <span>UCLA Outlet, est. 2024</span>
            </div>
        </footer>
    )
}

export default PageFooter;