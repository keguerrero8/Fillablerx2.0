import React from 'react';
import { Link } from 'react-router-dom';

import './FrequentRequests.css';

function FrequentRequests() {
    return (
            <div className='recent-container'>
                <h2>Most Frequent Requests:</h2>
                <h3>Week of 2/19/23</h3>
                <div className='request-groups'>
                    <div className='request-list'>
                        <h3>Aprepitant 125mg-80mg</h3>
                        <h3>Oseltamivir 75mg</h3>
                        <h3>Granisetron 1mg</h3>
                    </div>
                    <div className='request-list'>
                        <h3>Amoxicillin 400mg/5mL</h3>
                        <h3>Sucralfate 1mg</h3>
                        <h3>Megestrol 40mg</h3>
                    </div>
                    <div className='request-list'>
                        <h3>Oseltamivir 60mg/5mL</h3>
                        <h3>Ondansetron ODT 8mg</h3>
                        <h3>Xofluza 40mg</h3>
                    </div>
                </div>
                <div className='pharmacy-reach'>
                    <h3>Are you a pharmacy that has these medications?</h3>
                    <Link to='/contact-us' className='contact-link'>Join our pharmacy network!</Link>
                </div>
            </div>
    );
}

export default FrequentRequests;