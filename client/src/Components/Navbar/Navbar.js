import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Cookies from "js-cookie"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';

import {Button} from '../Button/Button';
import './Navbar.css';
import image from "../../images/icon-only-black.png"


function Navbar({ user, setUser }) {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick =() => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const isMobile = useMediaQuery('(max-width: 1160px)');

    const showButton = () => {
        if(window.innerWidth <= 1160) {
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
            closeMobileMenu()
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
                    <img className='home-logo' src={image} alt="KOW logo"/>
                    KOW
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    {click? <CloseIcon /> : <MenuIcon/>}
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    {isMobile && (
                        <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                        </li>
                    )}
                    <li className='nav-item'>
                        <Link to='/how-it-works' className='nav-links' onClick={closeMobileMenu}>
                            How It Works
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
                {!user && !button? <li className='nav-item'>
                        <Link to='/login' className='nav-links' onClick={closeMobileMenu}>
                            Sign In
                        </Link>
                    </li>: null}
                {user && !button && <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={handleLogOut}>
                            Sign Out
                        </Link>
                    </li>}
                </ul>
                {button && !user ? <Button path='/login'>Sign In
                    </Button> : null}
                {user && button? <Button path='/' onClick={handleLogOut}>Sign Out
                    </Button> : null}
            </div>
        </nav>
        </>
    );
}

export default Navbar;