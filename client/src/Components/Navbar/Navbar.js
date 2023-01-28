import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Cookies from "js-cookie"

import {Button} from '../Button/Button';
import './Navbar.css';


function Navbar({ user, setUser }) {
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

    function handleLogOut () {
        fetch("/auth-sessions/logout", {
          credentials: "include",
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken")
          },
        })
        .then(r => {
          if (r.ok) {
            setUser(null)
          }
        })
    }

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
                    {
                        user ? 
                            <li className='nav-item'>
                                <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                                    Dashboard
                                </Link>
                            </li>
                            :
                            null
                    }
                </ul>
                {button && !user ? <Button buttonStyle='.btn--outline' path='/login'>Sign In
                    </Button> : null}
                {user && <Button buttonStyle='.btn--outline' path='/' onClick={handleLogOut}>Sign Out
                    </Button>}
            </div>
        </nav>
        </>
    );
}

export default Navbar;