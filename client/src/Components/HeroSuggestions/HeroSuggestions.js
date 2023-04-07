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
                                <img src={image1} alt="man wrapped in blanket blowing his nose into a tissue"/>
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
                                <img src={image2} alt="woman with a cold experiencing chills and sitting with a thermometer in her mouth"/>
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
                                <img src={image3} alt="woman remembers to take her scheduled birth control tablet out of her medication package"/>
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
                                <img src={image4} alt="woman grasping her throat while inhaling a puff from her inhaler device"/>
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
                                <img src={image5} alt="man pulls up his sleeve to self-inject insulin into his arm"/>
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
                                <img src={image6} alt="man in a facemask flexes his arm to show the bandaid where he received a vaccine injection"/>
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