import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className='footer-container'>
            <section className='footer-links'>
                <div className='footer-terms'>
                    <div className='help-link'>
                        <p>Have Questions?</p>
                        <p>Need Help?</p>
                        <Link to='/contact-us' className='contact-us'>Contact Us</Link>
                    </div>
                    <div className='link-section'>
                        <div className='link-column'>
                            <p className='footer-terms-text'>
                                <Link className='nav-link' to="/how-it-works">How It Works</Link>
                            </p>
                            <p className='footer-terms-text'>
                                <Link className='nav-link' to="/find-medication">Find Medication</Link>
                            </p>
                            <p className='footer-terms-text'>
                                <Link className='nav-link' to="/contact-us">Contact Us</Link>
                            </p>
                            </div>
                            <div className='link-column'>
                            <p className='footer-terms-text'>
                                <Link className='nav-link' to="/terms-of-use">Terms of Use</Link>
                            </p>
                            <p className='footer-terms-text'>
                                <Link className='nav-link' to="/privacy-policy">Privacy Policy</Link>
                            </p>
                            {/*<p className='footer-terms-text'>
                                <Link className='nav-link' to="/termination-notice">Manage Cookie Preferences</Link>
                            </p>*/}
                        </div>
                    </div>
                </div>
            </section>
            <section className='social-media'>
                <small className='website-rights'>KOW (C) 2023</small>
            </section>
        </div>
    );
}

export default Footer;