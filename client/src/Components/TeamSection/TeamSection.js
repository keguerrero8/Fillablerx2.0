import React from 'react';

import './TeamSection.css';
import '../../App.css';
import '../Button/Button.css';

function TeamSection() {
    return (
        <div className='team-container'>
            <h1>The KOW Team</h1>
            <div className='team-body'>
                <h3>KOW was founded in 2022 with a mission to mitigate serious health events or hospitalizations that result from delaying medication treatment of high-risk conditions.</h3>
                <h3>Here are some of the individuals that are dedicated to breathing life into that mission.</h3>
            </div>
            <h2>Founders</h2>
            <div className='team-list'>
                <div className='card'>
                    <img className='team-img-wrap' alt='silly larry face' src='/images/img-larry.png'/>
                    <div className='team-person-name'>
                        <h3>Larry Chen</h3>
                        <p>Co-founder</p>
                    </div>
                </div>
                <div className='card'>
                    <img className='team-img-wrap' alt='silly kevin face' src='/images/img-kevin.png'/>
                    <div className='team-person-name'>
                        <h3>Kevin Guerrero</h3>
                        <p>Co-founder</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSection;