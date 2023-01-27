import React from 'react';

import './StorySection.css';
import '../../App.css';
import '../Button/Button.css';

import { Button } from '../Button/Button';

function StorySection() {
    return (
        <div className='story-container'>
            <h1>Founder's Story</h1>
            <div className='story-body'>
                <img className='story-pic-wrap' alt='man looking at a board thinking' src='/images/img-story.png'/>
                <div className='story-message'>
                    <h3>During the winter of 2022 into 2023, the United States experienced a "triple-demic" wave of COVID, influenza, and RSV (respiratory syncytial virus) infections sweep across the country. This surge, combined with widespread supply chain challenges, made it difficult for many people to find prescription antivirals, antibiotics, and even over-the-counter remedies. I personally saw the impact of this when my cousin on the other side of the country struggled to find Children's Tylenol for her 1-year-old son. Furthermore, my high school friend is an urgent care provider in New York who reported recurring shortages of critical flu treatments at the pharmacies, like Tamiflu.</h3>
                    <br/>
                    <h3>If this was 15-20 years ago, your local pharmacist would call a competitor across town and borrow medication he/she didn't have to make sure you could promptly start your treatment. These emergency "I-owe-you" transactions were widely known as KOWs (Kindly Oblige With). Although the medications were only borrowed and would later be returned, every pharmacy knew the value of sharing their inventory and what it meant to take care of a patient in need.</h3>                    
                    <br/>
                    <h3>My name is Dr. Larry Chen and as a community pharmacist with almost a decade of experience, I originally co-founded KOW to support cancer patients who struggled to find certain medications necessary for their chemotherapy treatments. However, during the development of our prototype, I saw a greater need for our services beyond the cancer patients I worked with; our tool could be invaluable in helping a broader spectrum of vulnerable patients. For instance, there are millions of people who have maintenance medication to manage one or more chronic conditions. Most of them are faced with seeking emergency medical treatment at an urgent care or hospital if they ran out and/or missed a dose of their medication. Unfortunately, the financial cost of visiting an urgent care or hospital, especially for those at high-risk, is simply not affordable and contributes to medical debt or worse, adverse health outcomes.</h3>
                    <br/>
                    <h3>Our goal at KOW is to champion a new standard of care that highlights patient care values of the previous generation while integrating modern technology to stretch a helping hand beyond our own community. With our help, we hope no one will fear the health risks associated with not having medication when it is needed the most.</h3>
                </div>
            </div>
            <div className='story-btns'>
                <Button className='btn' buttonStyle='btn--secondary' buttonSize='btn--large' path='/how-it-works'>
                    How It Works
                </Button>
                <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' path='find-medication'>
                    Find Medication
                </Button>
            </div>
        </div>
    );
}

export default StorySection;