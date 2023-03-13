import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from '../Components/HeroSection/HeroSection';

import '../App.css';

function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <>
            <Helmet>
                <title>KOW: Find Pharmacies with your Medication Today</title>
                <meta 
                    name='description' 
                    content='Your medication may not always be in stock at the pharmacy. Use KOW to find a local pharmacy that has your prescription medication. KOW contacts several neighborhood pharmacies and immediately notifies you when any of them confirm they have your medication in stock.'
                />   
                <link rel='canonical' href='/'/>
            </Helmet>
            <HeroSection/>
        </>
    );
}

export default Home;