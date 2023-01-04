import React, { useState, useRef } from 'react'

import ContactFormInput from '../../Components/ContactFormInput/ContactFormInput'
import { styles } from './ContactUs-styles';

import { Box, Button, Typography } from '@mui/material'
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

export default function ContactUs() {
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
        console.log(messageData)
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
    <Box sx={styles.MainContainer} component="form" onSubmit={handleSubmit} ref={form}>
        <Helmet>
            <title>Contact Us - FillableRx Support</title>
            <meta 
                name='description' 
                content='Email us. Leave us a message. If you have a question or feedback about our 
                services, please leave us a detailed message and we’ll get back to you as possible.'
            />   
            <link rel='canonical' href='/contact'/>
        </Helmet>

        <Box sx={styles.Container1}>
            <Typography sx={{fontWeight: 500, fontSize: "2.3rem"}}>Contact FillableRx</Typography>
            <Box>
                <Typography fontSize={"1.3rem"}>1-800-999-9999</Typography>
                <Typography fontSize={"1.3rem"}>help@fillablerx.com</Typography>
            </Box>
            <Typography sx={{fontWeight: 500, fontSize: "1.6rem"}}>Message Us!</Typography>
            <Box sx={{width: "70%", margin: {xs: "auto", sm: "auto", md: "0"}}}>
                <Typography fontSize={"1.3rem"}>
                    If you have a question, a coment, or need help using our services, 
                    leave us a message and we'll get back to you as soon as possible
                </Typography>
            </Box>
        </Box>

        <Box sx={styles.Container2}>
            {
                [
                    {width: "100%", label: "NAME", name: "user_name"}, 
                    {width: "100%", label: "EMAIL", name: "user_email"}, 
                    {width: "100%", label: "PHONE", name: "phone"}, 
                    {width: "100%", label: "MESSAGE", name: "message"}
                ]
                .map(i => 
                        <ContactFormInput 
                            messageData={messageData} 
                            flex={i.flex} 
                            label={i.label} 
                            name={i.name} 
                            handleChange={handleChange} 
                            key={i.label} 
                            isRequired={i.name === "phone"? false : true} 
                            isMultiline={i.name === "message"}
                        />
                    )
            }
            {
                status? 
                    <Box sx={{textAlign: "center", color: status === "We got your message. Thanks for the feedback!"? "green" : "red"}}>
                        <Typography>
                            {status}
                        </Typography>
                    </Box> : null
            }
            <Button variant='contained' type="submit" disabled={isDisabled}>SEND MESSAGE</Button>
        </Box>
    </Box>   
  )
}
