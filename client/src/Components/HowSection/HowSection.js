import React from 'react';

import './HowSection.css';
import '../../App.css';
import '../Button/Button.css';

import { Button } from '../Button/Button';

import image1 from "../../images/how-img-one.png"
import image2 from "../../images/how-img-two.png"
import image3 from "../../images/how-img-three.png"

function HowSection() {
    return (
        <div className='how-container'>
            <h1>Need Your Prescription Today?</h1>
            <div className='how-body'>
                <div className='how-step'>
                    <div className='img-wrap'>
                        <img src={image1}/>
                    </div>
                    <h3 className='step-text'>Select the medication you're looking for.</h3>
                    <h3 className='step-subtext'>Specify the strength, quantity, and what insurance you have.</h3>
                </div>
                <div className='how-step'>
                    <div className='img-wrap'>
                        <img src={image2}/>
                    </div>
                    <h3 className='step-text'>Our network of pharmacies is alerted right away.</h3>
                    <h3 className='step-subtext'>They will check their inventory and reply if they have it.</h3>
                </div>
                <div className='how-step'>
                    <div className='img-wrap'>
                        <img src={image3}/>
                    </div>
                    <h3 className='step-text'>Receive a text if a pharmacy has the medication.</h3>
                    <h3 className='step-subtext'>Contact the pharmacy to confirm when the prescription will be filled.</h3>
                </div>
            </div>
            <div className='how-buttons'>
                <Button 
                buttonSize='btn--large' 
                buttonStyle='btn--secondary'
                path='/contact-us'>
                    Need Help?
                </Button>
                <Button 
                buttonSize='btn--large'
                path='/find-medication'>
                    Find Medication
                </Button>
            </div>
        </div>
    );
}

export default HowSection;