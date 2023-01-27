import React from 'react';
import { Button } from '../Button/Button';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer(props) {
    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Subscribe to stay up to date with our service offers.
                </p>
                <div className='input-areas'>
                    <form>
                        <input 
                        type='email' 
                        name='email' 
                        placeholder='Your Email' 
                        className='footer-input'/>
                        <Button buttonStyle='btn--outline'>Subscribe</Button>
                    </form>
                </div>
                <p className='footer-subscription-text'>
                    You can unsubscribe at any time by clicking <Link className='unsubscribe-link'>here</Link>.
                </p>
                <Link className='cookie-preferences'>Manage Cookie Preferences</Link>
            </section>
            <section className='social-media'>
                <small className='website-rights'>KOW (C) 2023</small>
            </section>
        </div>
    );
}

export default Footer;