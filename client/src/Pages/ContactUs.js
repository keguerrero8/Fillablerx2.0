import React from "react";
import { Helmet } from 'react-helmet-async';

import ContactSection from "../Components/ContactSection/ContactSection";

import '../App.css';

export default function Products() {
    return (
        <>
            <Helmet>
                <title>Contact Us - KOW Support</title>
                <meta 
                    name='description' 
                    content='Email us. Leave us a message. If you have a question or feedback about our services, please leave us a detailed message and we’ll get back to you as possible.'
                />   
                <link rel='canonical' href='/contact-us'/>
            </Helmet>
            <ContactSection/>
        </>
    );
}