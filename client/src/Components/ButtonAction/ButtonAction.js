import React from 'react';
import './ButtonAction.css';

const STYLES = ['btn--primary', 'btn--secondary']
const SIZES = ['btn--medium', 'btn--large']

export const ButtonAction = ({children, type, onClick, buttonStyle, buttonSize}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
                >
                {children}
            </button>
    );
}
