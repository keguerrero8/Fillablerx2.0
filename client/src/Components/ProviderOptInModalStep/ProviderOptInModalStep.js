import React, { useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {styles} from './ProviderOptInModalStep-styles.js';

import { Button as ButtonMui, Box, Typography } from '@mui/material'
import ProviderOptInText from '../Documents/ProviderOptIn/ProviderOptInText.js';

function ProviderOptInModalStep({ setIsAcknowledged, isAcknowledged, handleClose }) {
    const [disabled, setDisabled] = useState(true)
    const scrollRef = useBottomScrollListener(() => setDisabled(false))

    return (
        <Box sx={styles.MainContainer}>
            <Typography variant='h3' sx={{fontWeight: "bold"}}>Provider Opt In Agreement</Typography>
            <Box ref={scrollRef} sx={styles.scrollContainer}>
                <ProviderOptInText isModal={true}/>
            </Box>
            <Box sx={styles.buttonsContainer}>
                <ButtonMui variant='contained' disabled={disabled} sx={{color: "white"}} size="medium" onClick={() => setIsAcknowledged(true)} >
                    Agree
                </ButtonMui>
                <ButtonMui variant='contained' disabled={!isAcknowledged} sx={{color: "white"}} size="medium" onClick={handleClose} >
                    Exit
                </ButtonMui>
            </Box>
        </Box>
    );
}

export default ProviderOptInModalStep;