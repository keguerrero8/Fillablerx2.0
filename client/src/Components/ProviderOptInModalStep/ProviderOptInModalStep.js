import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {styles} from './ProviderOptInModalStep-styles.js';

import { Button, Box, Typography } from '@mui/material'
import ProviderOptInText from '../Documents/ProviderOptIn/ProviderOptInText.js';

function ProviderOptInModalStep({ setIsAcknowledged, isAcknowledged, setIsAgreementModal }) {
    const navigate = useNavigate()
    const [disabled, setDisabled] = useState(true)
    const scrollRef = useBottomScrollListener(() => setDisabled(false))

    const handleAgreementExit = () => {
        setIsAcknowledged(true)
        setIsAgreementModal(false)
    }  

    return (
        <Box sx={styles.MainContainer}>
            <Typography variant='h3' sx={{fontWeight: "bold"}}>Provider Opt In Agreement</Typography>
            <Box ref={scrollRef} sx={styles.scrollContainer}>
                <ProviderOptInText isModal={true}/>
            </Box>
            <Box sx={styles.buttonsContainer}>
                <Button variant='contained' disabled={disabled} sx={{color: "white"}} size="medium" onClick={handleAgreementExit} >
                    Agree & Exit
                </Button>
            </Box>
            <Button sx={{position: "absolute", left: "5px", bottom: "0px"}} size="large" onClick={() => navigate("/")}>CANCEL</Button>
        </Box>
    );
}

export default ProviderOptInModalStep;