import React from 'react';

import './HowSection.css';
import '../../App.css';
import '../Button/Button.css';

import { Button } from '../Button/Button';

function HowSection() {
    return (
        <div className='how-container'>
            <h1>How to Use Our Service</h1>
            <div className='how-body'>
                <div className='how-body-text'>
                    <h2>First, FIND your medication at a pharmacy.</h2>
                    <div className='how-list'>
                        <div className='list-item'>
                            <h3>1.</h3>
                            <h3>KOW Meds connects you with our extensive network of neighborhood pharmacies.</h3>
                        </div>
                        <div className='list-item'>
                            <h3>2.</h3>
                            <h3>Your medication request alerts pharmacists within the community area you're searching in.</h3>
                        </div>
                        <div className='list-item'>
                            <h3>3.</h3>
                            <h3>If a pharmacy has the medication you're looking for, you will be notified immediately after the pharmacist checks their inventory.</h3>
                        </div>
                        <div className='list-item'>
                            <h3>4.</h3>
                            <h3>A text will inform you which pharmacy has the medication that same day - including the pharmacy name, address, and phone number.</h3>
                        </div>
                    </div>
                    <br></br>
                    <h2>Then, FILL your prescription!</h2>
                    <div className='how-list'>
                        <div className='list-item'>
                            <h3>1.</h3>
                            <h3>You can transfer a refill you have from your original pharmacy to this new pharmacy. Speak to a pharmacist to do so.</h3>
                        </div>
                        <div className='list-item'>
                            <h3>2.</h3>
                            <h3>You can give the pharmacy information to your prescribers so that they know where to send your prescription.</h3>
                        </div>
                        <div className='list-item'>
                            <h3>3.</h3>
                            <h3>You can call your original or the new pharmacy if you have any questions about the process.</h3>
                        </div>
                    </div>
                </div>
                <div className='how-body-img'>
                    <img className='how-img-wrap' src='src/images/img-laptop.png' alt='hands typing on a laptop'/>
                    <div className='how-btn'>
                        <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' path='/find-medication'>
                            Find Medication
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HowSection;