import React from 'react';

import './HeroSection.css';
import '../Button/Button.css';

import HeroSuggestions from '../HeroSuggestions/HeroSuggestions';
import FrequentRequests from '../FrequentRequests/FrequentRequests';
import { Button } from '../Button/Button';

import kindlyobligewith_title_text from '../../images/kindlyobligewith_text_image.png';


function HeroSection() {
    return (
        <div className='hero-container'>
            <img className='hero-title' src={kindlyobligewith_title_text}/>
            <h1>Find and Fill your prescription TODAY.</h1>
            <h2>Don't risk delaying your medication.</h2>
            <h3>If you need your medication today, we'll help you find a pharmacy that has it.</h3>
            <div className='hero-btns'>
                <Button 
                className='btn' 
                buttonStyle='btn--secondary' 
                buttonSize='btn--large' 
                buttonPage='btn--home'
                path='/how-it-works'>
                    Learn More
                </Button>
                <Button 
                className='btn' 
                buttonStyle='btn--outline' 
                buttonSize='btn--large' 
                buttonPage='btn--home'
                path='/find-medication'>
                    Find Medication
                </Button>
            </div>
            <HeroSuggestions/>
            <FrequentRequests/>
        </div>
    );
}

export default HeroSection;