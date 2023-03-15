import React, { useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { styles } from './TermsOfUseModalStep-styles.js';

import { Button as ButtonMui, Box, Typography } from '@mui/material'
import TermsText from '../Documents/TermsOfUse/TermsText.js';
import '../Documents/TermsOfUse/Terms.css'

function TermsOfServiceModalStep({ setStep }) {
    const [isDisabled, setDisabled] = useState(true)
    const [acknowledged, setAcknowledged] = useState(false)
    const scrollRef = useBottomScrollListener(() => setDisabled(false))

    return (
        <Box sx={styles.MainContainer}>
            <Typography variant='h3' sx={{fontWeight: "bold"}}>Terms of Use</Typography>
            <Box ref={scrollRef} sx={styles.scrollContainer}>
                <TermsText isModal={true}/>
            </Box>
            <Box sx={styles.buttonsContainer}>
                <ButtonMui variant='contained' disabled={isDisabled} sx={{color: "white"}} size="large" onClick={() => setAcknowledged(true)} >
                    Agree
                </ButtonMui>
                <ButtonMui variant='contained' disabled={!acknowledged} sx={{color: "white"}} size="small" onClick={() => setStep((val) => val + 1)} >
                    Continue
                </ButtonMui>
            </Box>
        </Box>
    );
}

export default TermsOfServiceModalStep;