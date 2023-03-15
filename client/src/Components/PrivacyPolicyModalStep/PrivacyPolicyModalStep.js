import React, { useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import {styles} from './PrivacyPolicyModalStep-styles.js';

import { Button as ButtonMui, Box, Typography } from '@mui/material'
import PrivacyText from '../Documents/PrivacyPolicy/PrivacyText.js';

function PrivacyPolicyModalStep({ setStep, userType, setIsAcknowledged, isAcknowledged, handleClose }) {
    const [disabled, setDisabled] = useState(true)
    const scrollRef = useBottomScrollListener(() => setDisabled(false))

    return (
        <Box sx={styles.MainContainer}>
            <Typography variant='h3' sx={{fontWeight: "bold"}}>Privacy Policy</Typography>
            <Box ref={scrollRef} sx={styles.scrollContainer}>
                <PrivacyText isModal={true}/>
            </Box>
            <Box sx={styles.buttonsContainer}>
                <ButtonMui variant='contained' disabled={disabled} sx={{color: "white"}} size="medium" onClick={() => setIsAcknowledged(true)} >
                    Agree
                </ButtonMui>
                {userType === "HCP"? (
                    <ButtonMui variant='contained' disabled={!isAcknowledged} sx={{color: "white"}} size="medium" onClick={() => setStep((val) => val + 1)} >
                        Continue
                    </ButtonMui>
                ) : (
                    <ButtonMui variant='contained' disabled={!isAcknowledged} sx={{color: "white"}} size="medium" onClick={handleClose}>
                    Exit
                    </ButtonMui>
                )}
            </Box>
        </Box>
    );
}

export default PrivacyPolicyModalStep;