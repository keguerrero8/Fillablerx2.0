import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--secondary', 'btn--tertiary']
const SIZES = ['btn--small', 'btn--medium', 'btn--large']
const PAGES = ['btn--default', 'btn--home', 'btn--how', 'btn--find', 'btn--contact', 'btn--other']

export const Button = ({children, type, onClick, buttonStyle, buttonSize, buttonPage, path}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    const checkButtonPage = PAGES.includes(buttonPage) ? buttonPage : PAGES[0]

    return (
        <Link to={(path)} className='btn-mobile'>
            <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonPage}`}
            onClick={onClick}
            type={type}
            >
            {children}
            </button>
        </Link>
    );
}
