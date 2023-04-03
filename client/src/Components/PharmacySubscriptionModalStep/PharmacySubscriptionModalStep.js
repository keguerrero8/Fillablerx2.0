import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { styles } from './PharmacySubscriptionModalStep-styles.js';

import { Button, Box, Typography } from '@mui/material'
import PharmacySubscriptionText from '../Documents/PharmacySubscription/PharmacySubscriptionText.js';
import '../Documents/PharmacySubscription/PharmacySubscription.css'

function PharmacySubscriptionModalStep({ setStep }) {
    const navigate = useNavigate()
    const [isDisabled, setDisabled] = useState(true)
    const scrollRef = useBottomScrollListener(() => setDisabled(false))

    return (
        <Box sx={styles.MainContainer}>
            <Typography variant='h3' sx={{fontWeight: "bold"}}>Pharmacy Subscription Agreement</Typography>
            <Box ref={scrollRef} sx={styles.scrollContainer}>
                <PharmacySubscriptionText isModal={true}/>
            </Box>
            <Box sx={styles.buttonsContainer}>
                <Button variant='contained' disabled={isDisabled} sx={{color: "white"}} size="large" onClick={() => setStep((val) => val + 1)} >
                    Agree & Continue
                </Button>
            </Box>
            <Button sx={{position: "absolute", left: "5px", bottom: "0px"}} size="large" onClick={() => navigate("/")}>CANCEL</Button>
        </Box>
    );
}

export default PharmacySubscriptionModalStep;