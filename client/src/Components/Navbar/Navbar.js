import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../Button/Button';
import './Navbar.css';


function Navbar(props) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick =() => setClick(!click);
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
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    K O W
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/our-story' className='nav-links' onClick={closeMobileMenu}>
                            About Us
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/how-it-works' className='nav-links' onClick={closeMobileMenu}>
                            How It Works
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/our-team' className='nav-links' onClick={closeMobileMenu}>
                            Our Team
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/find-medication' className='nav-links' onClick={closeMobileMenu}>
                            Find Medication
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
                            Contact Us
                        </Link>
                    </li>
                </ul>
                {/* {button && <Button buttonStyle='.btn--outline'>Sign In
                    </Button>} */}
            </div>
        </nav>
        </>
    );
}

export default Navbar;