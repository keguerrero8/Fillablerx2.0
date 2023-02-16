import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './Navsubbar.css';

function Navbar(props) {
    const [click, setClick] = useState(false);

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    useEffect(() => {showButton();}, []);

    window.addEventListener('resize', showButton);

    return (
        <>
        <nav className='navsubbar'>
            <div className='navsubbar-container'>
                <ul className='nav-subitem'>
                    <Link to='/our-story' className='nav-links' onClick={closeMobileMenu}>
                        Our Story
                    </Link>
                </ul>
                <ul className='nav-subitem'>
                    <Link to='/how-it-works' className='nav-links' onClick={closeMobileMenu}>
                        How It Works
                    </Link>
                </ul>
                <ul className='nav-subitem'>
                    <Link to='/our-team' className='nav-links' onClick={closeMobileMenu}>
                        Our Team
                    </Link>
                </ul>
                <ul className='nav-subitem'>
                    <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
                        Contact Us
                    </Link>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default Navbar;