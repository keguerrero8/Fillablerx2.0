import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <div className='footer-terms'>
                    <p className='footer-terms-text'>
                        <Link className='unsubscribe-link' to="/">Terms of Service</Link>
                    </p>
                    <p className='footer-terms-text'>
                        <Link className='unsubscribe-link' to="/">Privacy Policy</Link>
                    </p>
                </div>
                <Link className='cookie-preferences' to="/">Manage Cookie Preferences</Link>
            </section>
            <section className='social-media'>
                <small className='website-rights'>KOW (C) 2023</small>
            </section>
        </div>
    );
}

export default Footer;