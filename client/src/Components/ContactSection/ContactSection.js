import React, { useState, useRef } from 'react'

import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Typography } from '@mui/material'

import './ContactSection.css';
import '../../App.css';
import '../ButtonAction/ButtonAction.css';

function ContactSection() {
    const form = useRef();
    const [status, setMessageStatus] = useState("")
    const [isDisabled, setDisabled] = useState(false)
    const [messageData, setMessageData] = useState({
        user_name: "",
        user_email: "",
        phone: "",
        message: ""
    })

    function handleChange (e) {
        setMessageData({
            ...messageData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault()
        if (!messageData.user_name) {
            setMessageStatus("Please provide a name")
            return
        } else if (!messageData.user_email) {
            setMessageStatus("Please provide an email address")
            return
        } else if (!messageData.message) {
            setMessageStatus("Please provide a message")
            return
        }

        emailjs.sendForm('service_ayvdp8h', 'template_fnm1ty4', form.current, 'QxOOcszgK8UxwmM-h')
        .then((result) => {
            setMessageStatus("We got your message. Thanks for the feedback!")
            setDisabled(true)
        }, (error) => {
            setMessageStatus("Oops, looks like something went wrong, please contact the administrator")
        });
    }

    return (
        <div className='contact-container'>
            <Helmet>
                <title>Contact Us - FillableRx Support</title>
                <meta 
                    name='description' 
                    content='Email us. Leave us a message. If you have a question or feedback about our 
                    services, please leave us a detailed message and we’ll get back to you as possible.'
                />   
                <link rel='canonical' href='/contact'/>
            </Helmet>
            <div className='contact-message'>
                <h1>Get in touch with us!</h1>
                <h3>help@kowmeds.com</h3>
                <br/>
                <h3>If you have a question, a comment, or need help using our services, leave us a message. We'll get back to you as soon as possible.</h3>
            </div>
                <form className='contact-form' onSubmit={handleSubmit} ref={form}>
                    <h2>Name*</h2>
                        <input
                        type='text'
                        name='user_name'
                        placeholder='Your Name'
                        className='contact-input'
                        required
                        onChange={handleChange}
                        />
                    <br/>
                    <h2>Email*</h2>
                        <input
                        type='email'
                        name='user_email'
                        placeholder='Your Email' 
                        className='contact-input'
                        required
                        onChange={handleChange}
                        />
                    <br/>
                    <h2>Phone</h2>
                        <input
                        type='tel'
                        name='phone'
                        placeholder='Phone Number'
                        className='contact-input'
                        onChange={handleChange}
                        />
                    <br/>
                    <h2>Comments*</h2>
                        <textarea
                        name='message'
                        placeholder='Comments'
                        className='contact-input-comment'
                        onChange={handleChange}
                        rows={8}
                        />
                    {
                        status? 
                            <Box sx={{textAlign: "center", mt: "5px", color: status === "We got your message. Thanks for the feedback!"? "green" : "red"}}>
                                <Typography>
                                    {status}
                                </Typography>
                            </Box> : null
                    }
                    <Button variant='contained' type="submit" disabled={isDisabled} sx={{mt: "20px"}}>SEND MESSAGE</Button>
                </form>
        </div>
    );
}

export default ContactSection;