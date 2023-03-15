import React, {useEffect} from "react";
import { Helmet } from 'react-helmet-async';

import HowSection from "../Components/HowSection/HowSection";

import '../App.css';

export default function Products() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <>
            <Helmet>
                <title>About KOW: How It Works</title>
                <meta 
                    name='description' 
                    content='Learn more about KOW and how our platform connects you with your neighborhood pharmacies. We contact them simultaneously for you when you’re looking for your prescription medication.  You’ll then be notified of which of them have your medication in stock today.'
                />   
                <link rel='canonical' href='/how-it-works'/>
            </Helmet>
            <HowSection/>
        </>
    );
}