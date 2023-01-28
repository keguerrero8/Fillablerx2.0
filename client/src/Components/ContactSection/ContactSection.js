import React from 'react';
import { Button } from '../Button/Button';

import './ContactSection.css';
import '../../App.css';
import '../Button/Button.css';

function ContactSection() {
    return (
        <div className='contact-container'>
            <div className='contact-message'>
                <h1>Get in touch with us!</h1>
                <h3>Help@KOWmeds.com</h3>
                <br/>
                <h3>If you have a question, a comment, or need help using our services, leave us a message. We'll get back to you as soon as possible.</h3>
            </div>
            <div className='contact-form'>
                <h2>Name*</h2>
                <form>
                    <input
                    type='text'
                    name='name'
                    placeholder='Your Name'
                    className='contact-input'
                    required
                    />
                </form>
                <br/>
                <h2>Email*</h2>
                <form>
                    <input
                    type='email'
                    name='email'
                    placeholder='Your Email' 
                    className='contact-input'
                    required
                    />
                </form>
                <br/>
                <h2>Phone</h2>
                <form>
                    <input
                    type='tel'
                    name='phone'
                    placeholder='Phone Number'
                    className='contact-input'
                    />
                </form>
                <br/>
                <h2>Comments*</h2>
                <form>
                    <textarea
                    name='message'
                    placeholder='Comments'
                    className='contact-input-comment'
                    rows={8}
                    />
                </form>
                <div className='contact-btn'>
                    <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--medium' path='/'>
                        Send Message
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;