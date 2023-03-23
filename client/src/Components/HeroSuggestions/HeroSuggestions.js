import React from 'react';

import './HeroSuggestions.css';
import '../Button/Button.css';

import { Button } from '../Button/Button';

import image1 from "../../images/cold2.png"
import image2 from "../../images/av2.png"
import image3 from "../../images/bc3.png"
import image4 from "../../images/inh2.png"
import image5 from "../../images/gluc3.png"
import image6 from "../../images/vacc3.png"

function HeroSuggestions() {
    return (
            <div className='section-two'>
                <h2>Some medication can't wait...</h2>                
                <div className='med-groups'>
                    <div className='card-section'>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image1}/>
                            </div>
                            <h3>Antibiotics</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image2}/>
                            </div>
                            <h3>Antivirals</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image3}/>
                            </div>                        
                            <h3>Birth Control</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image4}/>
                            </div>
                            <h3>Inhalers</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image5}/>
                            </div>                        
                            <h3>Insulin</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                        <div className='med-card'>
                            <div className='card-img'>
                                <img src={image6}/>
                            </div>                        
                            <h3>Vaccines</h3>
                            <Button 
                            className='btn' 
                            buttonStyle='btn--tertiary' 
                            buttonSize='btn--small' 
                            path='/find-medication'>
                                Find Nearby
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
    );
}

export default HeroSuggestions;